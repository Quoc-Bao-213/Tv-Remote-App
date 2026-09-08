import { useAppStore } from "../../store/useAppStore";
import { useState, useCallback, useRef, useEffect } from "react";

const APP_NAME_BASE64 = "aU9TIFJlbW90ZQ=="; // Base64 for "iOS Remote"

export const useSamsungTV = () => {
  const { samsungTvIp, hasPaired, setHasPaired } = useAppStore();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [pairingRequired, setPairingRequired] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(
    (ipToConnect?: string, useSecure = true) => {
      const ip = ipToConnect || samsungTvIp;
      if (!ip) return;

      setIsConnecting(true);
      setPairingRequired(false);

      const port = useSecure ? "8002" : "8001";
      const protocol = useSecure ? "wss" : "ws";
      const wsUrl = `${protocol}://${ip}:${port}/api/v2/channels/samsung.remote.control?name=${APP_NAME_BASE64}`;

      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setIsConnected(true);
        setIsConnecting(false);
        setHasPaired(true); // Connected without issue means we are paired
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.event === "ms.channel.connect") {
            // Connection confirmed by TV
          } else if (data.event === "ms.channel.unauthorized") {
            // TV requires the user to click Allow on screen
            setPairingRequired(true);
            setIsConnected(false);
          }
        } catch (e) {
          console.error("WebSocket message parse error:", e);
        }
      };

      ws.onerror = (e) => {
        console.log(`WebSocket Error (${protocol} port ${port}):`, e);

        // If WSS fails (often due to React Native rejecting TV's self-signed cert), fallback to WS on 8001
        if (useSecure) {
          console.log("WSS failed. Falling back to WS on port 8001...");
          connect(ip, false);
        } else {
          setIsConnecting(false);
          if (!hasPaired) {
            setPairingRequired(true);
          }
        }
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsConnecting(false);
      };

      wsRef.current = ws;
    },
    [samsungTvIp, hasPaired, setHasPaired],
  );

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const sendKey = useCallback(
    (key: string) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.log("Not connected. Reconnecting...");
        if (samsungTvIp) connect();
        return;
      }

      const payload = {
        method: "ms.remote.control",
        params: {
          Cmd: "Click",
          DataOfCmd: key,
          Option: "false",
          TypeOfRemote: "SendRemoteKey",
        },
      };

      wsRef.current.send(JSON.stringify(payload));
    },
    [samsungTvIp, connect],
  );

  const launchApp = useCallback(
    (appId: string) => {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        console.log("Not connected. Reconnecting...");
        if (samsungTvIp) connect(samsungTvIp);
        return;
      }

      const payload = {
        method: "ms.channel.emit",
        params: {
          event: "ed.apps.launch",
          to: "host",
          data: {
            appId: appId,
            action_type: "DEEP_LINK",
          },
        },
      };

      wsRef.current.send(JSON.stringify(payload));
    },
    [samsungTvIp, connect],
  );

  useEffect(() => {
    // Optionally auto-connect if we already have the IP
    // if (samsungTvIp) connect();

    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    isConnected,
    isConnecting,
    pairingRequired,
    connect,
    disconnect,
    sendKey,
    launchApp,
    setPairingRequired,
  };
};
