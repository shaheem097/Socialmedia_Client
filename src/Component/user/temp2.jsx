<div class="h-screen w-14 md:w-64 text-white flex flex-col rounded-tl-lg md:rounded-bl-lg md:rounded-tr-lg transition-width duration-300">
  <div class="py-4 px-4">
    <div>
      
      <div class="hidden md:block flex flex-col items-center justify-center bg-red-400 mb-4 h-48">
        <div class="text-center">
          <img src="../../logo.png" alt="Logo" class="w-8 h-8 md:w-12 md:h-12 mr-2" />
        </div>
        <div class="text-center hidden md:block">Cosmobic</div>
      </div>

      <div class="my-2 border border-white rounded-lg">
        <button
          onClick={() => setActivePage('user')}
          class="hover:bg-gray-800 p-2 rounded w-full md:flex md:items-center md:justify-start relative"
        >
          <div class="line"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 md:w-6 md:h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span class="hidden md:inline">User Management</span>
        </button>
      </div>

      <!-- Repeat the above button div structure for other buttons -->
      
    </div>
  </div>
</div>
