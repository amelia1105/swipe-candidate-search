// TODO: Create an interface for the Candidate objects returned by the API
export default interface Candidate {
    readonly Image: string | null;
    readonly Name: string | null;
    readonly Location: string | null;
    readonly Email: string | null;
    readonly Company: string | null;
    readonly Bio: string | null;
}