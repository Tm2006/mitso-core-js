class PaginationHelper {
  /**
   * The constructor takes in an array of items and an integer indicating how many
   * items fit within a single page.
   * @param {Array} collection
   * @param {number} itemsPerPage
   */
  constructor(collection, itemsPerPage) {
    this.collection = collection;
    this.itemsPerPage = itemsPerPage;
  }

  /**
   * Returns the number of items within the entire collection.
   * @returns {number}
   */
  itemCount() {
    return this.collection.length;
  }

  /**
   * Returns the number of pages.
   * @returns {number}
   */
  pageCount() {
    return Math.ceil(this.collection.length / this.itemsPerPage);
  }

  /**
   * Returns the number of items on the current page.
   * This method should return -1 for pageIndex values that are out of range.
   * @param {number} pageIndex
   * @returns {number}
   */
  pageItemCount(pageIndex) {
    if (pageIndex < 0 || pageIndex >= this.pageCount()) {
      return -1;
    }
    if (pageIndex === this.pageCount() - 1) {
      return this.collection.length % this.itemsPerPage || this.itemsPerPage;
    }
    return this.itemsPerPage;
  }

  /**
   * Determines what page an item is on.
   * This method should return -1 for itemIndex values that are out of range.
   * @param {number} itemIndex
   * @returns {number}
   */
  pageIndex(itemIndex) {
    if (itemIndex < 0 || itemIndex >= this.collection.length) {
      return -1;
    }
    return Math.floor(itemIndex / this.itemsPerPage);
  }
}

module.exports = {
  PaginationHelper,
};
