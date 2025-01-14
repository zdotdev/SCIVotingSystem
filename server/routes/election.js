const express = require('express')
const router = express.Router()

const {
  getAllElections,
  getElectionById,
  getElectionResults,
  createElection,
  updateElection,
  addVotes,
  deleteElection,
  getDisplayedElections,
  getActiveElection
} = require('../controllers/election.js')

router.get('/', getAllElections)
router.get('/active', getActiveElection)
router.get('/displayed', getDisplayedElections)
router.get('/:id', getElectionById)
router.get('/:id/results', getElectionResults)
router.post('/', createElection)
router.put('/:id', updateElection)
router.put('/:id/vote', addVotes)
router.delete('/:id', deleteElection)

module.exports = router
