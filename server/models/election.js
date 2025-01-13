const mongoose = require('mongoose')

const electionCanditateSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true
  },
  candidatePosition: {
    type: String,
    required: true
  },
  candidateVotes: {
    type: Number,
    default: 0
  }
})

const electionSchema = new mongoose.Schema(
  {
    electionTitle: {
      type: String,
      required: true
    },
    electionStart: {
      type: Date,
      required: true
    },
    electionEnd: {
      type: Date,
      required: true
    },
    electionCandidates: [
      {
        type: electionCanditateSchema
      }
    ],
    electionVoters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    displayElection: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('election', electionSchema)
