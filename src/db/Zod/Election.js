import { z } from 'zod'

export const ElectionZodSchema = z.object({
  electionTitle: z.string().min(3, { message: 'Election title is required.' }),
  electionStart: z
    .string()
    .min(3, { message: 'Election start date is required.' }),
  electionEnd: z.string().min(3, { message: 'Election end date is required.' }),
  displayElection: z
    .string()
    .min(3, { message: 'Display election date is required.' })
})

export const ElectionCandidateZodSchema = z.object({
  candidateName: z
    .string({ message: 'Candidate name is required.' })
    .min(3, { message: 'Candidate name is required.' }),
  candidatePosition: z
    .string()
    .min(3, { message: 'Candidate position is required.' }),
  candidateParty: z.string().min(3, { message: 'Candidate party is required.' }),
  candidateVotes: z.number({ message: 'Vote must be a number.' }).default(0)
})

export const electionVoteZodSchema = z.object({
  candidateId: z.string().min(3, { message: 'Candidate Id is required.' }),
  votes: z
    .number({ message: 'Votes must be a number.' })
    .min(1, { message: 'Votes must be greater than 0.' })
    .max(1, { message: 'Votes must be equal 1.' })
})

export const electionSaveVoteZodSchema = z.object({
  votesData: z.array(electionVoteZodSchema),
  votersId: z.string().min(3, { message: 'Voters Id is required.' })
})