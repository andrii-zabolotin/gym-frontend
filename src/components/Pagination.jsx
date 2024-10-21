const Pagination = ({ currentPage, setCurrentPage, totalPages }) => (
    <div className="flex flex-row items-center justify-end space-x-5">
        <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing page {currentPage} of {totalPages}
        </span>
        <div className="inline-flex">
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`${currentPage === 1 ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "hover:bg-gray-900 dark:hover:bg-gray-700 dark:text-white"} flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-s-2xl dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
            >
                Prev
            </button>

            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`${currentPage === totalPages ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "hover:bg-gray-900 dark:hover:bg-gray-700 dark:text-white"} flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e-2xl dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
            >
                Next
            </button>
        </div>
    </div>
);

export default Pagination;
