# N8N Publishing Workflow Documentation

## Overview

This N8N workflow handles the article publishing process from the OPTIMUS SAAS dashboard. It receives article data, checks for modifications, updates the database if needed, and marks the article as published.

## Workflow Structure

### 1. **Webhook Trigger** (`webhook-trigger`)
- **Type**: Webhook (POST)
- **Path**: `/webhook/publish-article`
- **Receives**:
  ```json
  {
    "keyword": "string",
    "title": "string",
    "content": "string"
  }
  ```

### 2. **Find Article** (`supabase-find-article`)
- **Type**: Supabase Query
- **Operation**: SELECT
- **Query**: Find article by keyword
- **Purpose**: Retrieve existing article from database

### 3. **Article Exists Check** (`if-article-exists`)
- **Type**: IF Node
- **Condition**: Check if article was found
- **True Path**: Continue to change comparison
- **False Path**: Return "Article Not Found" error

### 4. **Compare Changes** (`code-compare-changes`)
- **Type**: Code Node
- **Logic**:
  - Compare new title vs existing title
  - Compare new content vs existing content
  - Return boolean indicating if changes detected
- **Output**:
  ```json
  {
    "keyword": "string",
    "newTitle": "string",
    "newContent": "string",
    "hasChanges": boolean,
    "articleId": "uuid"
  }
  ```

### 5. **Changes Detected Check** (`if-changes-detected`)
- **Type**: IF Node
- **Condition**: `hasChanges === true`
- **True Path**: Update article content first
- **False Path**: Skip update, go directly to publish

### 6A. **Update Article** (`supabase-update-article`) - If Changes
- **Type**: Supabase Update
- **Updates**: title, content, updated_at
- **Condition**: Only if changes detected

### 6B. **Set Published (No Changes)** (`supabase-publish-no-changes`)
- **Type**: Supabase Update
- **Updates**: published = true, updated_at
- **Condition**: If no changes detected

### 7. **Set Published** (`supabase-publish-article`) - After Update
- **Type**: Supabase Update
- **Updates**: published = true, updated_at
- **Condition**: After content update

### 8. **Success Response** (`response-success`)
- **Type**: Code Node
- **Returns**:
  ```json
  {
    "success": true,
    "message": "Article published successfully",
    "keyword": "string",
    "articleId": "uuid",
    "published": true,
    "timestamp": "ISO string"
  }
  ```

### 9. **Error Response** (`error-not-found`)
- **Type**: Code Node
- **Returns**:
  ```json
  {
    "success": false,
    "error": "Article not found",
    "message": "No article found with keyword: X",
    "keyword": "string",
    "timestamp": "ISO string"
  }
  ```

## Workflow Logic Flow

```
Webhook Receive Data
    ↓
Find Article by Keyword
    ↓
Article Exists? → NO → Return Error
    ↓ YES
Compare Changes
    ↓
Changes Detected? → NO → Set Published Only
    ↓ YES              ↓
Update Article      Set Published
    ↓                  ↓
Set Published          ↓
    ↓                  ↓
    ↓ ← ← ← ← ← ← ← ← ← ↓
Return Success Response
```

## Expected Data Flow

1. **Input from Optimus**: User modifies article and clicks "Publish"
2. **Webhook Trigger**: N8N receives article data
3. **Database Query**: Find existing article by keyword
4. **Change Detection**: Compare new vs existing content
5. **Conditional Update**: Update only if changes detected
6. **Publish Status**: Mark article as published
7. **Response**: Return success signal to Optimus

## Configuration Requirements

### Supabase Credentials
- **URL**: Your Supabase project URL
- **API Key**: Service role key for database operations
- **Table**: `articles` table with schema matching OPTIMUS

### Webhook Configuration
- **URL**: `https://your-n8n-instance.com/webhook/publish-article`
- **Method**: POST
- **Headers**: Content-Type: application/json

## Error Handling

- **Article Not Found**: Returns error if keyword doesn't match any article
- **Database Errors**: Supabase operations include error handling
- **Invalid Data**: Webhook validates required fields

## Integration with OPTIMUS

This workflow integrates with the OPTIMUS publishing system:
1. User clicks "Publish Article" button
2. Optimus sends POST request to webhook
3. N8N processes and updates database
4. Response triggers Optimus to refresh article data
5. Article appears in BlogMegaMenu on public website

## Testing

Use the N8N interface to test each node:
1. Import the JSON workflow
2. Configure Supabase credentials
3. Test with sample article data
4. Verify database updates
5. Check response format