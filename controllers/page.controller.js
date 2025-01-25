const Page = require('../models/Page');

module.exports = {
  // Create multiple pages in bulk
  createPages: async (req, res) => {
    try {
      const { pages, companyType } = req.body;
      if (!Array.isArray(pages) || pages.length === 0) {
        return res.status(400).json({ message: 'Pages array is required and should not be empty.' });
      }

      // Get the highest seqNumber from the existing pages
      const maxSeqNumberDoc = await Page.findOne()
        .sort({ seqNumber: -1 })
        .select("seqNumber");

      const startingSeqNumber = maxSeqNumberDoc ? maxSeqNumberDoc.seqNumber + 1 : 1;

      // Create new page documents with sequential numbers
      const pageDocuments = pages.map((name, index) => ({
        seqNumber: startingSeqNumber + index,
        name,
        companyType,
      }));

      const createdPages = await Page.insertMany(pageDocuments);
      res.status(201).json({ message: 'Pages created successfully', data: createdPages });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  },

  // Get all pages
  getPages: async (req, res) => {
    try {
      const pages = await Page.find({ isDeleted: false }).populate('companyType');
      res.status(200).json({ message: 'Pages retrieved successfully', data: pages });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  },

  // Get a single page by ID
  getPageById: async (req, res) => {
    try {
      const { id } = req.params;
      const page = await Page.findById(id).populate('companyType');
      if (!page || page.isDeleted) {
        return res.status(404).json({ message: 'Page not found' });
      }
      res.status(200).json({ message: 'Page retrieved successfully', data: page });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  },

  // Update a page by ID
  updatePage: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, companyType } = req.body;

      const updatedPage = await Page.findByIdAndUpdate(
        id,
        { name, companyType },
        { new: true }
      );

      if (!updatedPage || updatedPage.isDeleted) {
        return res.status(404).json({ message: 'Page not found' });
      }

      res.status(200).json({ message: 'Page updated successfully', data: updatedPage });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  },

  // Soft delete a page by ID
  deletePage: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedPage = await Page.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );

      if (!deletedPage) {
        return res.status(404).json({ message: 'Page not found' });
      }

      res.status(200).json({ message: 'Page deleted successfully', data: deletedPage });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error: error.message });
    }
  },
};
