import { CapabilityType } from "./CapabilityType.js";

export class CapabilityRouter {

    public route(_userRequest: string): CapabilityType {
        return CapabilityType.NATIVE;
    }

}