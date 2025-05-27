import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: '🏠 Accueil',
    url: '/dashboard',
    iconComponent: { name: 'cil-home' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: '📚 Articles',
    url: '/articles',
    iconComponent: { name: 'cil-book' },
    children: [
      {
        name: 'Mes contributions',
        url: '/articles/mes-contributions',
        attributes: { role: 'contributeur' }
      },
      {
        name: '➕ Ajouter un article',
        url: '/articles/ajouter',
        attributes: { role: 'contributeur' } // ou autre condition plus 
      }
    ]
  },
  {
    name: '🏷️ Thématiques',
    url: '/thematiques',
    iconComponent: { name: 'cil-tags' },
    children: [
      {
        name: '🧩 Métier',
        url: '/thematiques/metier'
      },
      {
        name: '💻 Technique',
        url: '/thematiques/technique'
      },
      {
        name: '🔐 Sécurité',
        url: '/thematiques/securite'
      },
      {
        name: '👥 RH',
        url: '/thematiques/rh'
      },
      {
        name: '➕ Ajouter une thématique',
        url: '/thematiques/ajouter',
        attributes: { role: 'admin' }
      }
    ]
  },
  {
    name: '🛠️ Modération',
    url: '/moderation',
    iconComponent: { name: 'cil-task' },
    attributes: { role: 'moderateur' }, // ou admin
    children: [
      {
        name: 'Articles à valider',
        url: '/moderation/a-valider'
      },
      {
        name: 'Retournés pour correction',
        url: '/moderation/retournes'
      }
    ]
  },
  {
    name: '👥 Utilisateurs',
    url: '/admin/utilisateurs',
    iconComponent: { name: 'cil-people' },
    attributes: { role: 'admin' },
    children: [
      {
        name: 'Gérer les utilisateurs',
        url: '/admin/utilisateurs/gerer'
      },
      {
        name: 'Gérer les rôles',
        url: '/admin/utilisateurs/roles'
      }
    ]
  },
  {
    name: '⚙️ Paramètres',
    url: '/parametres',
    iconComponent: { name: 'cil-settings' },
    children: [
      {
        name: 'Mon profil',
        url: '/parametres/profil'
      },
      {
        name: 'Déconnexion',
        url: '/logout'
      }
    ]
  }
];
