// @generated by protobuf-ts 2.8.2
// @generated from protobuf file "timing.proto" (package "Services", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Timestamp } from "./google/protobuf/timestamp";
/**
 * @generated from protobuf message Services.CallRequest
 */
export interface CallRequest {
    /**
     * @generated from protobuf field: string Name = 1 [json_name = "Name"];
     */
    name: string;
}
/**
 * @generated from protobuf message Services.CallResponse
 */
export interface CallResponse {
    /**
     * @generated from protobuf field: google.protobuf.Timestamp Timestamp = 1 [json_name = "Timestamp"];
     */
    timestamp?: Timestamp;
    /**
     * @generated from protobuf field: string Message = 2 [json_name = "Message"];
     */
    message: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class CallRequest$Type extends MessageType<CallRequest> {
    constructor() {
        super("Services.CallRequest", [
            { no: 1, name: "Name", kind: "scalar", jsonName: "Name", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<CallRequest>): CallRequest {
        const message = { name: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CallRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CallRequest): CallRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string Name = 1 [json_name = "Name"];*/ 1:
                    message.name = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CallRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string Name = 1 [json_name = "Name"]; */
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Services.CallRequest
 */
export const CallRequest = new CallRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CallResponse$Type extends MessageType<CallResponse> {
    constructor() {
        super("Services.CallResponse", [
            { no: 1, name: "Timestamp", kind: "message", jsonName: "Timestamp", T: () => Timestamp },
            { no: 2, name: "Message", kind: "scalar", jsonName: "Message", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<CallResponse>): CallResponse {
        const message = { message: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<CallResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: CallResponse): CallResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Timestamp Timestamp = 1 [json_name = "Timestamp"];*/ 1:
                    message.timestamp = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.timestamp);
                    break;
                case /* string Message = 2 [json_name = "Message"];*/ 2:
                    message.message = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: CallResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Timestamp Timestamp = 1 [json_name = "Timestamp"]; */
        if (message.timestamp)
            Timestamp.internalBinaryWrite(message.timestamp, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* string Message = 2 [json_name = "Message"]; */
        if (message.message !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.message);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Services.CallResponse
 */
export const CallResponse = new CallResponse$Type();
/**
 * @generated ServiceType for protobuf service Services.Timing
 */
export const Timing = new ServiceType("Services.Timing", [
    { name: "Call", serverStreaming: true, options: {}, I: CallRequest, O: CallResponse }
]);