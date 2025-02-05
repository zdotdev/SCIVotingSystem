import mongoose from 'mongoose'

const electionCanditateSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: true
  },
  candidatePosition: {
    type: String,
    required: true
  },
  candidateParty: {
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

const Election = mongoose.model('election', electionSchema)

export default Election