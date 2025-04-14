export class ProfileIsNotExistsError extends Error {
    constructor() {
        super('Profile is not exists')
    }
}