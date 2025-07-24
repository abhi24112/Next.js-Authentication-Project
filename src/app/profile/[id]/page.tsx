export default function UserProfile({ params }: any) {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        {/* Avatar Placeholder */}
        <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-indigo-100 dark:bg-gray-700 flex items-center justify-center">
                {/* Display first letter of username as avatar */}
                <span className="text-4xl font-bold text-indigo-500 dark:text-indigo-400">
                  {/* {data.username.charAt(0).toUpperCase()} */}
                </span>
              </div>
            </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          User Profile
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
          Details for user ID:
        </p>

        {/* User ID from URL */}
        <div className="p-4 bg-indigo-100 dark:bg-gray-700/50 rounded-lg">
          <p className="font-mono text-sm text-indigo-800 dark:text-indigo-300 break-all">
            {params.id}
          </p>
        </div>
      </div>
    </div>
  );
}
