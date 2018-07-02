defmodule Glass.Auth.Mailer do
  use Bamboo.Mailer, otp_app: :glass
  use Bamboo.Phoenix, view: GlassWeb.EmailView

  import Bamboo.Email

  def magic_link_email(user, magic_token, _extra_params) do
    new_email()
    |> to(user.email)
    |> from("info@overmind.fi")
    |> subject("Your login link for Overmind")
    |> assign(:token, magic_token)
    |> render("magic_link.html")
  end
end
