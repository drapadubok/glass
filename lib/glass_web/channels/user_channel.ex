defmodule GlassWeb.UserChannel do
  use GlassWeb, :channel

  def join("users:" <> user_id, _params, socket) do
    current_user = socket.assigns.current_user

    if String.to_integer(user_id) == current_user.id do
      {:ok, socket}
    else
      {:error, %{reason: "Invalid user"}}
    end
  end

  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end
end
