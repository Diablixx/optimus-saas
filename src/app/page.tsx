'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [keyword, setKeyword] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState({
    title: '',
    keyword: '',
    content: ''
  });

  const handleGenerate = async () => {
    if (!keyword.trim()) return;

    setIsGenerating(true);

    try {
      console.log('🚀 Sending request to N8N webhook with keyword:', keyword.trim());

      const response = await fetch('https://n8niacloud.khapeo.com/webhook-test/ai-article-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword: keyword.trim()
        })
      });

      console.log('📡 N8N response status:', response.status);
      console.log('📡 N8N response headers:', response.headers);

      if (response.ok) {
        const data = await response.json();
        setGeneratedArticle({
          title: data.title || `Article générée pour "${keyword}"`,
          keyword: keyword,
          content: data.content || 'Le contenu de l\'article généré par l\'IA apparaîtra ici après la génération...'
        });
      } else {
        // Handle error response
        const errorData = await response.text();
        console.error('❌ N8N webhook error:', response.status, errorData);
        setGeneratedArticle({
          title: `Article générée pour "${keyword}" (Test Mode)`,
          keyword: keyword,
          content: `Erreur de connexion au workflow N8N (${response.status}): ${errorData}`
        });
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setGeneratedArticle({
        title: `Article générée pour "${keyword}" (Offline Mode)`,
        keyword: keyword,
        content: 'Erreur de connexion réseau. Mode hors ligne activé.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    // TODO: Connect to N8N publication workflow in Phase 3
    alert('Fonction de publication sera disponible en Phase 3');
  };

  return (
    <div>
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="mt-2 text-gray-600">
          Générez des articles optimisés SEO à partir de mots-clés avec l'IA OPTIMUS
        </p>
      </div>

      {/* Keyword Input Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 className="ml-3 text-xl font-semibold text-gray-900">Génération d'Article</h2>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Entrez votre mot-clé..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-gray-900"
            disabled={isGenerating}
          />
          <button
            onClick={handleGenerate}
            disabled={!keyword.trim() || isGenerating}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[150px]"
          >
            {isGenerating ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Génération...
              </div>
            ) : (
              'Générer l\'Article'
            )}
          </button>
        </div>
      </div>

      {/* Article Display Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Article Généré</h2>

        <div className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre
            </label>
            <input
              type="text"
              value={generatedArticle.title}
              onChange={(e) => setGeneratedArticle({...generatedArticle, title: e.target.value})}
              placeholder="Le titre de l'article apparaîtra ici..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-medium text-gray-900"
            />
          </div>

          {/* Keyword Field (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot clé
            </label>
            <input
              type="text"
              value={generatedArticle.keyword}
              readOnly
              placeholder="Le mot-clé utilisé apparaîtra ici..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          {/* Article Content Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contenu de l'article
            </label>
            <textarea
              value={generatedArticle.content}
              onChange={(e) => setGeneratedArticle({...generatedArticle, content: e.target.value})}
              placeholder="Le contenu complet de l'article généré par l'IA apparaîtra ici. Vous pourrez le modifier avant publication..."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
            />
          </div>

          {/* Publish Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handlePublish}
              disabled={!generatedArticle.title || !generatedArticle.content}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Publier l'Article
            </button>
          </div>
        </div>

        {/* Empty State */}
        {!generatedArticle.title && !isGenerating && (
          <div className="text-center py-12 text-gray-500">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg mb-2">Prêt à générer votre premier article</p>
            <p className="text-sm">Entrez un mot-clé ci-dessus et cliquez sur "Générer l'Article"</p>
          </div>
        )}
      </div>
    </div>
  );
}
