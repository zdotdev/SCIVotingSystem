const { z } = require('zod')

const ElectionZodSchema = z.object({
  electionTitle: z.string().min(3, { message: 'Election title is required.' }),
  electionDescription: z
    .string()
    .min(3, { message: 'Election description is required.' }),
  electionStart: z
    .string()
    .min(3, { message: 'Election start date is required.' }),
  electionEnd: z.string().min(3, { message: 'Election end date is required.' }),
  displayElection: z
    .string()
    .min(3, { message: 'Display election date is required.' })
})

const ElectionCandidateZodSchema = z.object({
  candidateName: z
    .string({ message: 'Candidate name is required.' })
    .min(3, { message: 'Candidate name is required.' }),
  candidatePosition: z
    .string()
    .min(3, { message: 'Candidate position is required.' }),
  candidateVotes: z.number({ message: 'Vote must be a number.' }).default(0)
})

module.exports = { ElectionZodSchema, ElectionCandidateZodSchema }
