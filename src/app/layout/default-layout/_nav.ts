import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: '🏠 Accueil',
    url: '/dashboard',
    iconComponent: { name: 'cil-home' },
  },

  {
    name: '📚 Articles',
    iconComponent: { name: 'cil-book' },
    children: [
      {
        name: '📄 Liste des articles',
        url: '/articles/liste'
      },
      {
        name: '⭐ Favoris',
        url: '/articles/favoris'
      },
      {
        name: '📝 Mes contributions',
        url: '/articles/mes-contributions',
         attributes: { role: ['admin','contributeur', 'moderateur'] }
      },
      {
        name: '➕ Ajouter un article',
        url: '/articles/ajouter',
         attributes: { role: ['contributeur', 'moderateur'] }
      }
    ]
  },

  {
    name: '🛠️ Modération',
    url: '/moderation',
    iconComponent: { name: 'cil-task' },
    attributes: { role: ['moderateur'] },
    children: [
      {
        name: '📥 À valider',
        url: '/moderation/liste-a-valider'
      },
      {
        name: '📝 À corriger',
        url: '/moderation/a-corriger'
      }
    ]
  },


  {
    name: '👥 Utilisateurs',
    iconComponent: { name: 'cil-people' },
    attributes: { role: ['admin'] },
    children: [
      {
        name: '👤 Gérer les utilisateurs',
        url: '/admin/utilisateurs/gerer'
      },
      {
        name: '🛡️ Gérer les rôles',
        url: '/admin/utilisateurs/roles'
      }
    ]
  },

  {
    name: '⚙️ Paramètres',
    iconComponent: { name: 'cil-settings' },
    children: [
      {
        name: '👤 Mon profil',
        url: '/parametres/profil'
      },
      {
        name: '🔐 Déconnexion',
        url: '/logout'
      }
    ]
  }
];
