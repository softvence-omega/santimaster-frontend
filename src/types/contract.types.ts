export type TMessage = {
    _id: string
    fullName: string;
    email: string;
    subject: string;
    message: string;
    attachments?: string
    isTermAgreed: boolean,
    createdAt: Date,
    updatedAt: Date
};