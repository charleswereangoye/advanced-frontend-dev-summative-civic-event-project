// Global UI components: Navbar, Notifications Drawer, and Footer
const Components = {
  // Render top navbar matching Figma specs
  renderNavbar: function (activePage = 'events') {
    const user = Auth.getUser();
    const isLoggedIn = Auth.isAuthenticated();
    const isAdmin = Auth.isAdmin();

    // Active link underline styles
    const activeClass = 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-1';
    const inactiveClass = 'text-slate-700 hover:text-blue-600 font-medium transition';

    // User initials avatar
    let initials = 'U';
    if (user && user.full_name) {
      initials = user.full_name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
    }

    const navbarHtml = `
      <header class="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <!-- Logo & Brand -->
          <div class="flex items-center gap-6">
            <a href="index.html" class="flex items-center gap-2.5 shrink-0">
              <img src="assets/logo.svg" alt="CivicEvents+ Logo" class="w-6 h-6">
              <span class="text-xl font-bold tracking-tight text-slate-900">CivicEvents+</span>
            </a>

            <!-- Global search input (desktop) -->
            <div class="hidden md:block relative w-72">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input 
                type="text" 
                id="global-search-input" 
                placeholder="Search events, announcements..." 
                class="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
              >
            </div>
          </div>

          <!-- Navigation Links -->
          <nav class="hidden lg:flex items-center gap-8">
            <a href="index.html" class="${activePage === 'events' ? activeClass : inactiveClass}">Events</a>
            <a href="announcements.html" class="${activePage === 'announcements' ? activeClass : inactiveClass}">Announcements</a>
            <a href="promos.html" class="${activePage === 'promos' ? activeClass : inactiveClass}">Promos</a>
            
            <!-- RBAC: Show admin dashboard link only for users with admin role -->
            ${isAdmin ? `
              <a href="dashboard.html" class="${activePage === 'dashboard' ? activeClass : inactiveClass} flex items-center gap-1.5 text-blue-600 font-semibold">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                Dashboard
              </a>
            ` : ''}
          </nav>

          <!-- Right side controls: Notification bell & User Profile / Auth buttons -->
          <div class="flex items-center gap-3">
            
            <!-- Notification Bell (visible if logged in) -->
            ${isLoggedIn ? `
              <button 
                id="btn-open-notifications" 
                class="relative p-2.5 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition cursor-pointer"
                aria-label="View notifications"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                <span 
                  id="nav-unread-badge" 
                  class="hidden absolute top-1 right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white"
                >0</span>
              </button>
            ` : ''}

            <!-- Auth profile or buttons -->
            ${isLoggedIn ? `
              <div class="relative">
                <button 
                  id="user-menu-btn" 
                  class="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 transition cursor-pointer focus:outline-none"
                >
                  <div class="w-9 h-9 rounded-full bg-blue-600 text-white font-semibold text-xs flex items-center justify-center shadow-sm">
                    ${initials}
                  </div>
                  <span class="hidden md:inline-block text-sm font-semibold text-slate-800">${user.full_name || 'My Account'}</span>
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>

                <!-- Profile Dropdown -->
                <div 
                  id="user-dropdown" 
                  class="hidden absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50"
                >
                  <div class="px-4 py-2 border-b border-slate-100">
                    <p class="text-sm font-semibold text-slate-900 truncate">${user.full_name}</p>
                    <p class="text-xs text-slate-500 truncate">${user.email}</p>
                    <span class="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded ${isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}">
                      ${user.role}
                    </span>
                  </div>

                  <a href="profile.html" class="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    My Profile
                  </a>

                  <a href="my-registrations.html" class="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
                    <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    My Registrations
                  </a>

                  <!-- RBAC: Dropdown admin link -->
                  ${isAdmin ? `
                    <a href="dashboard.html" class="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 transition">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                      Admin Dashboard
                    </a>
                  ` : ''}

                  <div class="border-t border-slate-100 my-1"></div>

                  <button 
                    id="btn-logout" 
                    class="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Sign Out
                  </button>
                </div>
              </div>
            ` : `
              <!-- Unauthenticated buttons -->
              <a href="login.html" class="px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                Sign In
              </a>
              <a href="signup.html" class="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition">
                Sign Up
              </a>
            `}

            <!-- Mobile menu button -->
            <button id="mobile-menu-btn" class="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile navigation drawer -->
        <div id="mobile-menu" class="hidden lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          <a href="index.html" class="block py-2 text-sm font-medium ${activePage === 'events' ? 'text-blue-600' : 'text-slate-700'}">Events</a>
          <a href="announcements.html" class="block py-2 text-sm font-medium ${activePage === 'announcements' ? 'text-blue-600' : 'text-slate-700'}">Announcements</a>
          <a href="promos.html" class="block py-2 text-sm font-medium ${activePage === 'promos' ? 'text-blue-600' : 'text-slate-700'}">Promos</a>
          ${isAdmin ? `
            <a href="dashboard.html" class="block py-2 text-sm font-medium text-blue-600">Admin Dashboard</a>
          ` : ''}
        </div>
      </header>
    `;

    $('#navbar-placeholder').html(navbarHtml);
    if (isLoggedIn) {
      this.renderDrawer();
    }
    this.initNavbarEvents();
  },

  // Navbar interaction events
  initNavbarEvents: function () {
    // Dropdown toggle
    $('#user-menu-btn').on('click', function (e) {
      e.stopPropagation();
      $('#user-dropdown').toggleClass('hidden');
    });

    $(document).on('click', function () {
      $('#user-dropdown').addClass('hidden');
    });

    // Mobile menu toggle
    $('#mobile-menu-btn').on('click', function () {
      $('#mobile-menu').toggleClass('hidden');
    });

    // Logout
    $('#btn-logout').on('click', function () {
      Auth.logout();
    });

    // Global search on Enter key
    $('#global-search-input').on('keypress', function (e) {
      if (e.which === 13) {
        const query = $(this).val().trim();
        window.location.href = `index.html?search=${encodeURIComponent(query)}`;
      }
    });

    // Fetch unread notification count if user is logged in
    if (Auth.isAuthenticated()) {
      this.fetchUnreadNotificationCount();
    }
  },

  // Slide-over Notification Drawer
  renderDrawer: function () {
    if ($('#notification-drawer-wrapper').length) return;
    const drawerHtml = `
      <div id="notification-drawer-wrapper" class="hidden fixed inset-0 z-50 overflow-hidden">
        <!-- Backdrop -->
        <div id="drawer-backdrop" class="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"></div>
        
        <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div class="w-screen max-w-md bg-white shadow-2xl flex flex-col">
            
            <!-- Drawer Header -->
            <div class="p-6 border-b border-slate-200 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <h2 class="text-lg font-bold text-slate-900">Notifications</h2>
                <span id="drawer-unread-tag" class="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">0 unread</span>
              </div>
              <button id="btn-close-drawer" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <!-- Drawer List -->
            <div id="drawer-notifications-list" class="flex-1 overflow-y-auto p-4 space-y-3">
              <div class="text-center py-8 text-slate-400 text-sm">Loading notifications...</div>
            </div>

            <!-- Drawer Footer -->
            <div class="p-4 border-t border-slate-100 bg-slate-50 text-center text-xs text-slate-500">
              In-app notification feed powered by CivicEvents+
            </div>
          </div>
        </div>
      </div>
    `;

    $('body').append(drawerHtml);
    this.initDrawerEvents();
  },

  // Notification Drawer logic
  initDrawerEvents: function () {
    const self = this;

    // Open drawer
    $(document).on('click', '#btn-open-notifications', function () {
      $('#notification-drawer-wrapper').removeClass('hidden');
      self.loadNotifications();
    });

    // Close drawer
    $(document).on('click', '#btn-close-drawer, #drawer-backdrop', function () {
      $('#notification-drawer-wrapper').addClass('hidden');
    });
  },

  // Load notifications from API
  loadNotifications: function () {
    const container = $('#drawer-notifications-list');
    const isAdmin = Auth.isAdmin();

    API.get('/notifications')
      .done(function (res) {
        const notifications = res.data || [];
        container.empty();

        if (notifications.length === 0) {
          container.html(`
            <div class="text-center py-12 text-slate-400 text-sm">
              <svg class="w-12 h-12 mx-auto text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
              No notifications at this time
            </div>
          `);
          $('#drawer-unread-tag').text('0 unread');
          $('#nav-unread-badge').addClass('hidden').text('0');
          return;
        }

        let unreadCount = 0;

        notifications.forEach(function (n) {
          if (!n.read) unreadCount++;

          const dateStr = new Date(n.created_at).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          const typeColors = {
            event: 'bg-blue-100 text-blue-700',
            promo: 'bg-emerald-100 text-emerald-700',
            system: 'bg-slate-100 text-slate-700'
          };
          const badgeColor = typeColors[n.type] || 'bg-slate-100 text-slate-700';

          const card = $(`
            <div 
              class="notification-item p-4 rounded-xl border ${n.read ? 'bg-white border-slate-200' : 'bg-blue-50/50 border-blue-200'} transition hover:border-slate-300 relative group cursor-pointer"
              data-id="${n.id}"
              data-event-id="${(n.metadata && n.metadata.event_id) ? n.metadata.event_id : ''}"
            >
              <div class="flex items-start justify-between gap-2">
                <span class="px-2 py-0.5 text-[10px] font-bold uppercase rounded ${badgeColor}">
                  ${n.type || 'Notice'}
                </span>
                <span class="text-[11px] text-slate-400">${dateStr}</span>
              </div>
              <h4 class="text-sm font-semibold text-slate-900 mt-1">${n.title}</h4>
              <p class="text-xs text-slate-600 mt-1 leading-relaxed">${n.message}</p>
              
              <!-- RBAC: Delete button visible only to admins -->
              ${isAdmin ? `
                <button 
                  class="btn-delete-notification absolute top-3 right-3 p-1 text-slate-400 hover:text-red-600 rounded transition opacity-0 group-hover:opacity-100"
                  data-id="${n.id}"
                  title="Delete notification"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              ` : ''}
            </div>
          `);

          container.append(card);
        });

        // Update counts
        $('#drawer-unread-tag').text(`${unreadCount} unread`);
        if (unreadCount > 0) {
          $('#nav-unread-badge').removeClass('hidden').text(unreadCount > 9 ? '9+' : unreadCount);
        } else {
          $('#nav-unread-badge').addClass('hidden').text('0');
        }
      })
      .fail(function () {
        container.html('<div class="text-center py-6 text-red-500 text-sm">Failed to load notifications.</div>');
      });

    // Handle item click (navigate to related event if present)
    container.off('click', '.notification-item').on('click', '.notification-item', function (e) {
      if ($(e.target).closest('.btn-delete-notification').length) return;
      const eventId = $(this).data('event-id');
      if (eventId) {
        window.location.href = `event-detail.html?id=${eventId}`;
      }
    });

    // RBAC: Handle admin notification delete
    container.off('click', '.btn-delete-notification').on('click', '.btn-delete-notification', function (e) {
      e.stopPropagation();
      const notifId = $(this).data('id');
      const itemEl = $(this).closest('.notification-item');

      if (confirm('Are you sure you want to delete this notification?')) {
        API.delete(`/notifications/${notifId}`)
          .done(function () {
            itemEl.slideUp(200, function () {
              itemEl.remove();
            });
            Components.showToast('Notification deleted', 'success');
          })
          .fail(function () {
            Components.showToast('Failed to delete notification', 'error');
          });
      }
    });
  },

  // Fetch unread count for navbar badge
  fetchUnreadNotificationCount: function () {
    API.get('/notifications')
      .done(function (res) {
        const notifications = res.data || [];
        const unread = notifications.filter(n => !n.read).length;
        if (unread > 0) {
          $('#nav-unread-badge').removeClass('hidden').text(unread > 9 ? '9+' : unread);
        } else {
          $('#nav-unread-badge').addClass('hidden').text('0');
        }
      });
  },

  // Render global footer matching Figma
  renderFooter: function () {
    const footerHtml = `
      <footer class="bg-white border-t border-slate-200 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="md:col-span-2 space-y-3">
              <div class="flex items-center gap-2.5">
                <img src="assets/logo.svg" alt="CivicEvents+ Logo" class="w-6 h-6">
                <span class="text-xl font-bold tracking-tight text-slate-900">CivicEvents+</span>
              </div>
              <p class="text-sm text-slate-600 max-w-sm leading-relaxed">
                Empowering residents with transparent civic information, public town halls, community celebrations, and municipal services.
              </p>
            </div>
            
            <div>
              <h4 class="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Portal Navigation</h4>
              <ul class="space-y-2 text-sm text-slate-600">
                <li><a href="index.html" class="hover:text-blue-600 transition">Events Directory</a></li>
                <li><a href="announcements.html" class="hover:text-blue-600 transition">Audio Announcements</a></li>
                <li><a href="promos.html" class="hover:text-blue-600 transition">Video Promos</a></li>
              </ul>
            </div>

            <div>
              <h4 class="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">Community &amp; Support</h4>
              <ul class="space-y-2 text-sm text-slate-600">
                <li><a href="#" class="hover:text-blue-600 transition">Municipal Helpdesk</a></li>
                <li><a href="#" class="hover:text-blue-600 transition">Accessibility Guidelines</a></li>
                <li><a href="#" class="hover:text-blue-600 transition">Terms &amp; Privacy</a></li>
              </ul>
            </div>
          </div>

          <div class="border-t border-slate-100 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>&copy; 2026 CivicEvents+. Accessible City Events &amp; Services Portal.</p>
            <p>Built with accessible web standards (WCAG AA compliant).</p>
          </div>
        </div>
      </footer>
    `;

    $('#footer-placeholder').html(footerHtml);
  },

  // Floating Toast alert
  showToast: function (message, type = 'success') {
    let container = $('#toast-container');
    if (container.length === 0) {
      container = $('<div id="toast-container" class="fixed top-5 right-5 z-50 flex flex-col gap-3"></div>');
      $('body').append(container);
    }

    const bgColor = type === 'success' ? 'bg-emerald-600' : (type === 'error' ? 'bg-red-600' : 'bg-blue-600');
    const toast = $(`
      <div class="${bgColor} text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 transition transform duration-300">
        <span>${message}</span>
      </div>
    `);
    container.append(toast);
    setTimeout(() => {
      toast.fadeOut(400, () => toast.remove());
    }, 3500);
  },

  // Contextual Event Image resolver (matches cards and detail views 100%)
  getEventImageUrl: function (event) {
    if (event && event.metadata && event.metadata.image_url) {
      return event.metadata.image_url;
    }
    const title = ((event && event.title) || '').toLowerCase();
    const desc = ((event && event.description) || '').toLowerCase();
    const loc = ((event && event.location) || '').toLowerCase();
    const cat = (event && event.metadata && event.metadata.category ? event.metadata.category : '').toLowerCase();
    const combined = `${title} ${desc} ${loc} ${cat}`;

    if (combined.includes('marathon') || combined.includes('run') || combined.includes('athletic')) {
      return 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80';
    }
    if (combined.includes('clean') || combined.includes('green') || combined.includes('tree') || combined.includes('environment') || combined.includes('earth')) {
      return 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80';
    }
    if (combined.includes('library') || combined.includes('tech') || combined.includes('code') || combined.includes('forum') || combined.includes('education')) {
      return 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80';
    }
    if (combined.includes('jazz') || combined.includes('music') || combined.includes('concert') || combined.includes('sunset') || combined.includes('band')) {
      return 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80';
    }
    if (combined.includes('market') || combined.includes('farmer') || combined.includes('craft') || combined.includes('artisan') || combined.includes('food')) {
      return 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80';
    }
    if (combined.includes('soccer') || combined.includes('football') || combined.includes('sports') || combined.includes('youth') || combined.includes('league')) {
      return 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
    }
    return 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80';
  }
};
