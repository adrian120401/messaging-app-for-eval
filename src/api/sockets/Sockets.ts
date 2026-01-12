import io, { Socket as SocketType } from "socket.io-client";

import { config } from "../config";
import { SocketCallback, SocketEvent } from "../types/socket";

export class Socket {
  private static socket?: SocketType;
  private static listeners = new Map<string, Function>();

  static start() {
    Socket.socket = io(`${config.socketUrl}`);

    Socket.socket.on("connect", () => {
      Socket.socket?.emit("join-chat", { username: "testuser" });
    });
  }

  static async listen<T>(event: SocketEvent, callback: SocketCallback<T>) {
    if (!Socket.socket) {
      Socket.start();
    }

    return new Promise<void>((resolve) => {
      const setupListener = () => {
        const wrapper = (data: T) => {
          callback(data);
        };

        Socket.listeners.set(event, wrapper);

        Socket.socket?.on(event, wrapper);
        resolve();
      };

      if (Socket.socket?.connected) {
        setupListener();
      } else {
        Socket.socket?.on("connect", setupListener);
      }
    });
  }

  static async stop<T>(event?: SocketEvent, callback?: SocketCallback<T>) {
    if (!Socket.socket || !event) {
      return;
    }

    const wrapper = Socket.listeners.get(event);
    if (wrapper) {
      Socket.socket.off(event, wrapper as any);
      Socket.listeners.delete(event);
    }
  }

  static isConnected() {
    return !!Socket.socket;
  }

  static async disconnect() {
    Socket.socket?.disconnect();
    Socket.socket = undefined;
    Socket.listeners.clear();
  }

  static async removeAllListeners(event?: SocketEvent) {
    Socket.socket?.removeAllListeners(event);
    if (event) {
      Socket.listeners.delete(event);
    } else {
      Socket.listeners.clear();
    }
  }
}
