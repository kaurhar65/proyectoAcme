using Microsoft.AspNetCore.Authorization;
using Reservas.Policies.Requirements;
using Reservas.Entities;

namespace Reservas.Policies.Handlers;

public class AdminHandler : AuthorizationHandler<ReservationAccessRequirement, Reservation>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        ReservationAccessRequirement requirement,
        Reservation resource
    )
    {
        if (context.User.IsInRole("Admin"))
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}
