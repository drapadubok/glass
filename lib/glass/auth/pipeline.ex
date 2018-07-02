defmodule Glass.Auth.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :glass,
    error_handler: Glass.Auth.ErrorHandler,
    module: Glass.Auth.Guardian

  # Validate token if it is in session
  plug(Guardian.Plug.VerifySession, claims: %{"typ" => "access"})

  # Validate authorization header
  plug(Guardian.Plug.VerifyHeader, claims: %{"typ" => "access"}, realm: "Bearer")

  # Load the user if either of the above succeeded
  plug(Guardian.Plug.LoadResource, allow_blank: true, ensure: true)
end
