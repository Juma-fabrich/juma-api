import { Strategy } from "passport-jwt";
export type Payload = {
    id: string;
};
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate({ id }: Payload): Promise<{
        id: string;
    }>;
}
export {};
