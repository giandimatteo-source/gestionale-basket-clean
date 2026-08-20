import express from 'express';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Placeholder for instat integration
// This will fetch player statistics from basketball.instatscout.com
// Credentials: r.pasquali@pallacanestroforli2015.it / Basket&2015!

router.get('/player/:instatId', verifyToken, async (req, res) => {
  try {
    const { instatId } = req.params;

    if (!instatId) {
      return res.status(400).json({ error: 'instatId is required' });
    }

    // TODO: Implement instatscout API integration
    // For now, return placeholder data
    res.json({
      success: true,
      message: 'Instat integration pending',
      instatId,
      stats: {
        // Placeholder statistics structure
        min: 0,
        points: 0,
        fg: '0/0',
        fgPercent: 0,
        threePt: '0/0',
        threePtPercent: 0,
        ft: '0/0',
        ftPercent: 0,
      },
    });
  } catch (error) {
    console.error('Instat fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch instat data' });
  }
});

export default router;
