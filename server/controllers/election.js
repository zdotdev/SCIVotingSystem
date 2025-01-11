const Election = require('../models/election.js')
const User = require('../models/user.js')
const mongoose = require('mongoose')
const {
  ElectionZodSchema,
  ElectionCandidateZodSchema
} = require('../zod/election.js')

// get all elections
const getAllElections = async (req, res) => {
  try {
    const elections = await Election.find()

    if (!elections || !elections.length) {
      return res.status(404).json({ message: 'No elections found' })
    }

    return res.status(200).json({
      message: 'Election list retrieved successfully.',
      election: elections
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

// Get election by id
const getElectionById = async (req, res) => {
  try {
    const { id } = req.params
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: 'Election Id is required.' })
    }
    const election = await Election.findById(id)

    if (!election) {
      return res.status(404).json({ message: 'Election not found' })
    }

    return res
      .status(200)
      .json({ message: 'Election retrieved successfully.', election })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

// Get ellection results
const getElectionResults = async (req, res) => {
  try {
    const { id } = req.params
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: 'Election Id is required.' })
    }

    const election = await Election.findById(id).select('electionCandidates')

    if (!election) {
      return res.status(404).json({ message: 'Election not found' })
    }

    return res
      .status(200)
      .json({ message: 'Election results retrieved successfully.', election })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

// Create election
const createElection = async (req, res) => {
  try {
    const {
      electionTitle,
      electionDescription,
      electionStart,
      electionEnd,
      electionCandidates,
      displayElection
    } = req.body
    const parsedElection = ElectionZodSchema.safeParse(req.body)
    const parsedCandidates = electionCandidates.map(candidate => {
      return ElectionCandidateZodSchema.safeParse(candidate)
    })

    if (!parsedElection.success) {
      return res
        .status(400)
        .json({ message: parsedElection.error.issues[0].message })
    }
    if (parsedCandidates.some(candidate => !candidate.success)) {
      return res.status(400).json({
        message: parsedCandidates.error.issues[0].message
      })
    }

    if (!parsedElection) {
      return res.status(400).json({ message: 'Invalid election data.' })
    }
    const existingElection = await Election.findOne({ electionTitle })

    if (existingElection) {
      return res.status(400).json({ message: 'Election already exists.' })
    }
    const election = new Election({
      electionTitle,
      electionDescription,
      electionStart,
      electionEnd,
      electionCandidates,
      displayElection
    })
    try {
      await election.save()
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }

    return res
      .status(201)
      .json({ message: 'Election created successfully.', election })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

// Update election
const updateElection = async (req, res) => {
  try {
    const { id } = req.params
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: 'Election Id is required.' })
    }
    const {
      electionTitle,
      electionDescription,
      electionStart,
      electionEnd,
      electionCandidates,
      displayElection
    } = req.body
    const parsedElection = ElectionZodSchema.safeParse(req.body)
    const parsedCandidates = electionCandidates.map(candidate => {
      return ElectionCandidateZodSchema.safeParse(candidate)
    })

    if (!parsedElection.success) {
      return res.status(400).json({ message: 'Invalid election data.' })
    }
    if (parsedCandidates.some(candidate => !candidate.success)) {
      return res.status(400).json({
        message: parsedCandidates.error.issues[0].message
      })
    }

    const election = await Election.findById(id)

    if (!election) {
      return res.status(404).json({ message: 'Election not found' })
    }

    try {
      election.electionTitle = electionTitle
      election.electionDescription = electionDescription
      election.electionStart = electionStart
      election.electionEnd = electionEnd
      election.electionCandidates = electionCandidates
      election.displayElection = displayElection
      await election.save()
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    return res
      .status(200)
      .json({ message: 'Election updated successfully.', election })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

// Add votes per candidate
const addVotes = async (req, res) => {
  try {
    const { id } = req.params
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: 'Election Id is required.' })
    }
    const { votesData, votersId } = req.body // votesData should be an array of objects with candidateId, votes, and votersId

    const election = await Election.findById(id)
    const voters = await User.findById(votersId)

    if (!election) {
      return res.status(404).json({ message: 'Election not found' })
    }

    if (!voters) {
      return res.status(404).json({ message: 'Voter not found' })
    }

    try {
      votesData.forEach(({ candidateId, votes }) => {
        const candidate = election.electionCandidates.id(candidateId)
        if (!candidate) {
          throw new Error(`Candidate with id ${candidateId} not found`)
        }
        candidate.candidateVotes += votes
      })
      election.electionVoters.push(votersId)

      await election.save()
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
    return res
      .status(200)
      .json({ message: 'Votes added successfully.', election })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

// Delete election
const deleteElection = async (req, res) => {
  try {
    const { id } = req.params
    if (!id || !mongoose.isValidObjectId(id)) {
      return res.status(404).json({ message: 'Election Id is required.' })
    }

    const election = await Election.find({ _id: id })

    if (!election) {
      return res.status(404).json({ message: 'Election not found' })
    }

    try {
      await Election.deleteOne({ _id: id })
      return res.status(200).json({ message: 'Election deleted successfully.' })
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getAllElections,
  getElectionById,
  getElectionResults,
  createElection,
  updateElection,
  addVotes,
  deleteElection
}
