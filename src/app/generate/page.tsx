export default function Generate() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Génération d'Articles</h1>
        <p className="mt-2 text-gray-600">
          Créez des articles optimisés SEO en quelques minutes grâce à notre IA avancée
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Generation Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Nouveau Article</h2>

            <div className="space-y-6">
              {/* Keyword Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot-clé principal *
                </label>
                <input
                  type="text"
                  placeholder="ex: intelligence artificielle, marketing digital..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Entrez le mot-clé autour duquel vous souhaitez créer votre article
                </p>
              </div>

              {/* Article Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'article
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Guide complet</option>
                  <option>Article de blog</option>
                  <option>Tutoriel étape par étape</option>
                  <option>Comparatif</option>
                  <option>Liste à puces</option>
                  <option>Étude de cas</option>
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ton de l'article
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Professionnel</option>
                  <option>Conversationnel</option>
                  <option>Technique</option>
                  <option>Accessible</option>
                  <option>Persuasif</option>
                </select>
              </div>

              {/* Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Longueur de l'article
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center">
                    <div className="font-medium">Court</div>
                    <div className="text-xs text-gray-500">500-800 mots</div>
                  </button>
                  <button className="px-4 py-2 border-2 border-blue-500 bg-blue-50 rounded-lg text-center">
                    <div className="font-medium text-blue-700">Moyen</div>
                    <div className="text-xs text-blue-600">800-1500 mots</div>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center">
                    <div className="font-medium">Long</div>
                    <div className="text-xs text-gray-500">1500+ mots</div>
                  </button>
                </div>
              </div>

              {/* Additional Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructions supplémentaires (optionnel)
                </label>
                <textarea
                  rows={4}
                  placeholder="Ajoutez des instructions spécifiques pour personnaliser votre article..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Generate Button */}
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Générer l'Article
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Aperçu
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Tips Card */}
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Conseils pour de meilleurs résultats</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Utilisez des mots-clés spécifiques</li>
                  <li>• Évitez les termes trop génériques</li>
                  <li>• Pensez à votre audience cible</li>
                  <li>• Ajoutez du contexte si nécessaire</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Generation Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Statut de génération</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-3"></div>
                <span className="text-gray-500">En attente</span>
              </div>
              <div className="text-center py-4">
                <p className="text-sm text-gray-500">Aucune génération en cours</p>
              </div>
            </div>
          </div>

          {/* Recent Keywords */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mots-clés récents</h3>
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">Aucun mot-clé utilisé récemment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}