import { RequestDetail } from "anyproxy";

export type Request = RequestDetail;
export type Response = any;
export type Body = any;

export type Module = {
  pattern: RegExp;
  rewrite: Function;
};

export type ProtoBuf = {
  Root: {
    fromJSON: (arg0: {
      nested: {
        BootstrapResponse: {
          fields: {
            ucsResponseV0: { type: string; id: number };
            trialsFacadeResponseV1: { type: string; id: number };
          };
        };
        UcsResponseWrapperV0: {
          fields: {
            success: { type: string; id: number };
            error: { type: string; id: number };
          };
        };
        UcsResponseWrapperSuccess: {
          fields: { customization: { type: string; id: number } };
        };
        UcsResponseWrapperError: {
          fields: {
            errorCode: { type: string; id: number };
            message: { type: string; id: number };
            logId: { type: string; id: number };
          };
        };
        TrialsFacadeResponseWrapperV1: {
          fields: {
            success: { type: string; id: number };
            error: { type: string; id: number };
          };
        };
        TrialsFacadeResponseWrapperError: {
          fields: {
            errorCode: { type: string; id: number };
            message: { type: string; id: number };
            logId: { type: string; id: number };
          };
        };
        TrialsFacadeResponseWrapperSuccess: {
          fields: { filed1: { type: string; id: number } };
        };
        UcsResponseWrapper: {
          fields: {
            success: { type: string; id: number };
            error: { type: string; id: number };
          };
        };
        UcsResponse: {
          fields: {
            resolveSuccess: { type: string; id: number };
            resolveError: { type: string; id: number };
            accountAttributesSuccess: { type: string; id: number };
            accountAttributesError: { type: string; id: number };
            fetchTimeMillis: { type: string; id: number };
          };
        };
        ResolveResponse: {
          fields: { configuration: { type: string; id: number } };
        };
        Configuration: {
          fields: {
            configurationAssignmentId: { type: string; id: number };
            fetchTimeMillis: { type: string; id: number };
            assignedValues: { rule: string; type: string; id: number };
          };
        };
        AssignedValue: {
          fields: {
            propertyId: { type: string; id: number };
            metadata: { type: string; id: number };
            boolValue: { type: string; id: number };
            intValue: { type: string; id: number };
            enumValue: { type: string; id: number };
          };
        };
        Identifier: {
          fields: {
            scope: { type: string; id: number };
            name: { type: string; id: number };
          };
        };
        Metadata: {
          fields: {
            policyId: { type: string; id: number };
            externalRealm: { type: string; id: number };
            externalRealmId: { type: string; id: number };
          };
        };
        BoolValue: { fields: { value: { type: string; id: number } } };
        EnumValue: { fields: { value: { type: string; id: number } } };
        IntValue: { fields: { value: { type: string; id: number } } };
        AccountAttributesResponse: {
          fields: {
            accountAttributes: { keyType: string; type: string; id: number };
          };
        };
        AccountAttribute: {
          fields: {
            boolValue: { type: string; id: number };
            longValue: { type: string; id: number };
            stringValue: { type: string; id: number };
          };
        };
        Error: {
          fields: {
            errorCode: { type: string; id: number };
            errorMessage: { type: string; id: number };
          };
        };
      };
    }) => {
      (): any;
      new (): any;
      lookupType: { (arg0: string): any; new (): any };
    };
  };
};
