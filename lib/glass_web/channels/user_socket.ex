defmodule GlassWeb.UserSocket do
  use Phoenix.Socket
  alias Glass.Auth.Guardian

  ## Channels
  # channel "room:*", GlassWeb.RoomChannel
  channel("users:*", GlassWeb.UserChannel)

  transport(:websocket, Phoenix.Transports.WebSocket)
  transport(:longpoll, Phoenix.Transports.LongPoll)

  def connect(%{"token" => token}, socket) do
    case Guardian.decode_and_verify(token) do
      {:ok, claims} ->
        case Guardian.resource_from_claims(claims["sub"]) do
          {:ok, user} ->
            {:ok, assign(socket, :current_user, user)}

          {:error, _reason} ->
            :error
        end

      {:error, _reason} ->
        :error
    end
  end

  def connect(_params, _socker), do: :error

  def id(socket), do: "users_socket:#{socket.assigns.current_user.id}"
end
