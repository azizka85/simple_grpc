// @generated by protobuf-ts 2.8.2
// @generated from protobuf file "chat.proto" (package "Services", syntax proto3)
// tslint:disable
import { Empty } from "./google/protobuf/empty";
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
 * @generated from protobuf message Services.User
 */
export interface User {
    /**
     * @generated from protobuf field: string Name = 1 [json_name = "Name"];
     */
    name: string;
}
/**
 * @generated from protobuf message Services.JoinResponse
 */
export interface JoinResponse {
    /**
     * @generated from protobuf field: bool Success = 1 [json_name = "Success"];
     */
    success: boolean;
    /**
     * @generated from protobuf field: string Message = 2 [json_name = "Message"];
     */
    message: string;
    /**
     * @generated from protobuf field: repeated Services.User Users = 3 [json_name = "Users"];
     */
    users: User[];
}
/**
 * @generated from protobuf message Services.UserMessage
 */
export interface UserMessage {
    /**
     * @generated from protobuf field: Services.User From = 1 [json_name = "From"];
     */
    from?: User;
    /**
     * @generated from protobuf field: string Message = 2 [json_name = "Message"];
     */
    message: string;
}
/**
 * @generated from protobuf message Services.ChatMessage
 */
export interface ChatMessage {
    /**
     * @generated from protobuf field: google.protobuf.Timestamp Timestamp = 1 [json_name = "Timestamp"];
     */
    timestamp?: Timestamp;
    /**
     * @generated from protobuf oneof: message
     */
    message: {
        oneofKind: "response";
        /**
         * @generated from protobuf field: Services.JoinResponse Response = 2 [json_name = "Response"];
         */
        response: JoinResponse;
    } | {
        oneofKind: "message";
        /**
         * @generated from protobuf field: Services.UserMessage Message = 3 [json_name = "Message"];
         */
        message: UserMessage;
    } | {
        oneofKind: "exitSignal";
        /**
         * @generated from protobuf field: Services.User ExitSignal = 4 [json_name = "ExitSignal"];
         */
        exitSignal: User;
    } | {
        oneofKind: "enterSignal";
        /**
         * @generated from protobuf field: Services.User EnterSignal = 5 [json_name = "EnterSignal"];
         */
        enterSignal: User;
    } | {
        oneofKind: undefined;
    };
}
// @generated message type with reflection information, may provide speed optimized methods
class User$Type extends MessageType<User> {
    constructor() {
        super("Services.User", [
            { no: 1, name: "Name", kind: "scalar", jsonName: "Name", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<User>): User {
        const message = { name: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<User>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: User): User {
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
    internalBinaryWrite(message: User, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
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
 * @generated MessageType for protobuf message Services.User
 */
export const User = new User$Type();
// @generated message type with reflection information, may provide speed optimized methods
class JoinResponse$Type extends MessageType<JoinResponse> {
    constructor() {
        super("Services.JoinResponse", [
            { no: 1, name: "Success", kind: "scalar", jsonName: "Success", T: 8 /*ScalarType.BOOL*/ },
            { no: 2, name: "Message", kind: "scalar", jsonName: "Message", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "Users", kind: "message", jsonName: "Users", repeat: 1 /*RepeatType.PACKED*/, T: () => User }
        ]);
    }
    create(value?: PartialMessage<JoinResponse>): JoinResponse {
        const message = { success: false, message: "", users: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<JoinResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: JoinResponse): JoinResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* bool Success = 1 [json_name = "Success"];*/ 1:
                    message.success = reader.bool();
                    break;
                case /* string Message = 2 [json_name = "Message"];*/ 2:
                    message.message = reader.string();
                    break;
                case /* repeated Services.User Users = 3 [json_name = "Users"];*/ 3:
                    message.users.push(User.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: JoinResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* bool Success = 1 [json_name = "Success"]; */
        if (message.success !== false)
            writer.tag(1, WireType.Varint).bool(message.success);
        /* string Message = 2 [json_name = "Message"]; */
        if (message.message !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.message);
        /* repeated Services.User Users = 3 [json_name = "Users"]; */
        for (let i = 0; i < message.users.length; i++)
            User.internalBinaryWrite(message.users[i], writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Services.JoinResponse
 */
export const JoinResponse = new JoinResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class UserMessage$Type extends MessageType<UserMessage> {
    constructor() {
        super("Services.UserMessage", [
            { no: 1, name: "From", kind: "message", jsonName: "From", T: () => User },
            { no: 2, name: "Message", kind: "scalar", jsonName: "Message", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<UserMessage>): UserMessage {
        const message = { message: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<UserMessage>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: UserMessage): UserMessage {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* Services.User From = 1 [json_name = "From"];*/ 1:
                    message.from = User.internalBinaryRead(reader, reader.uint32(), options, message.from);
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
    internalBinaryWrite(message: UserMessage, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* Services.User From = 1 [json_name = "From"]; */
        if (message.from)
            User.internalBinaryWrite(message.from, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
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
 * @generated MessageType for protobuf message Services.UserMessage
 */
export const UserMessage = new UserMessage$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ChatMessage$Type extends MessageType<ChatMessage> {
    constructor() {
        super("Services.ChatMessage", [
            { no: 1, name: "Timestamp", kind: "message", jsonName: "Timestamp", T: () => Timestamp },
            { no: 2, name: "Response", kind: "message", jsonName: "Response", oneof: "message", T: () => JoinResponse },
            { no: 3, name: "Message", kind: "message", jsonName: "Message", oneof: "message", T: () => UserMessage },
            { no: 4, name: "ExitSignal", kind: "message", jsonName: "ExitSignal", oneof: "message", T: () => User },
            { no: 5, name: "EnterSignal", kind: "message", jsonName: "EnterSignal", oneof: "message", T: () => User }
        ]);
    }
    create(value?: PartialMessage<ChatMessage>): ChatMessage {
        const message = { message: { oneofKind: undefined } };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<ChatMessage>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ChatMessage): ChatMessage {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* google.protobuf.Timestamp Timestamp = 1 [json_name = "Timestamp"];*/ 1:
                    message.timestamp = Timestamp.internalBinaryRead(reader, reader.uint32(), options, message.timestamp);
                    break;
                case /* Services.JoinResponse Response = 2 [json_name = "Response"];*/ 2:
                    message.message = {
                        oneofKind: "response",
                        response: JoinResponse.internalBinaryRead(reader, reader.uint32(), options, (message.message as any).response)
                    };
                    break;
                case /* Services.UserMessage Message = 3 [json_name = "Message"];*/ 3:
                    message.message = {
                        oneofKind: "message",
                        message: UserMessage.internalBinaryRead(reader, reader.uint32(), options, (message.message as any).message)
                    };
                    break;
                case /* Services.User ExitSignal = 4 [json_name = "ExitSignal"];*/ 4:
                    message.message = {
                        oneofKind: "exitSignal",
                        exitSignal: User.internalBinaryRead(reader, reader.uint32(), options, (message.message as any).exitSignal)
                    };
                    break;
                case /* Services.User EnterSignal = 5 [json_name = "EnterSignal"];*/ 5:
                    message.message = {
                        oneofKind: "enterSignal",
                        enterSignal: User.internalBinaryRead(reader, reader.uint32(), options, (message.message as any).enterSignal)
                    };
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
    internalBinaryWrite(message: ChatMessage, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* google.protobuf.Timestamp Timestamp = 1 [json_name = "Timestamp"]; */
        if (message.timestamp)
            Timestamp.internalBinaryWrite(message.timestamp, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* Services.JoinResponse Response = 2 [json_name = "Response"]; */
        if (message.message.oneofKind === "response")
            JoinResponse.internalBinaryWrite(message.message.response, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* Services.UserMessage Message = 3 [json_name = "Message"]; */
        if (message.message.oneofKind === "message")
            UserMessage.internalBinaryWrite(message.message.message, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* Services.User ExitSignal = 4 [json_name = "ExitSignal"]; */
        if (message.message.oneofKind === "exitSignal")
            User.internalBinaryWrite(message.message.exitSignal, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* Services.User EnterSignal = 5 [json_name = "EnterSignal"]; */
        if (message.message.oneofKind === "enterSignal")
            User.internalBinaryWrite(message.message.enterSignal, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Services.ChatMessage
 */
export const ChatMessage = new ChatMessage$Type();
/**
 * @generated ServiceType for protobuf service Services.Chat
 */
export const Chat = new ServiceType("Services.Chat", [
    { name: "Join", serverStreaming: true, options: {}, I: User, O: ChatMessage },
    { name: "SendMessage", options: {}, I: ChatMessage, O: Empty }
]);
