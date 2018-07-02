# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Glass.Repo.insert!(%Glass.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Glass.Repo
alias Glass.Events.Branch
alias Glass.Events.Source
alias Glass.Events.Event
alias Glass.Events.Property

require Logger

# Create 2 branches
for _ <- 1..2 do
  %Branch{id: branch_id} = Repo.insert!(%Branch{name: Faker.Name.name})
  # Create 3 sources for each branch
  for _ <- 1..3 do
    %Source{id: source_id} = Repo.insert!(%Source{name: Faker.Name.name, branch_id: branch_id})
    # Create 5 events for each source
    for _ <- 1..5 do
      %Event{id: event_id} = Repo.insert!(
        %Event{
          name: Faker.Name.name,
          source_id: source_id,
          valid_from: Faker.DateTime.backward(4),
          valid_until: Faker.DateTime.backward(1),
          is_current_version: true,
          description: Faker.Lorem.Shakespeare.En.hamlet,
          owner: Faker.Name.name,
          deleted: false
        }
      )
      # Create 2 properties for each event
      for _ <- 1..2 do
        Repo.insert!(
          %Property{
            name: Faker.Name.name,
            event_id: event_id,
            valid_from: Faker.DateTime.backward(4),
            valid_until: Faker.DateTime.backward(1),
            is_current_version: true,
            description: Faker.Lorem.Shakespeare.En.hamlet,
            type: "string",
            is_personal: true,
            is_mandatory: false
          }
        )
      end
    end
  end
end


Glass.Auth.create_user(%{username: "drapadubok", password: "admin", email: "dmitry@yousician.com"})
