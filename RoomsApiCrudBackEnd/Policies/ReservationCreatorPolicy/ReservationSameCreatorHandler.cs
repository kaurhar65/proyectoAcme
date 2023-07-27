using System.Security.Claims;
using RoomsApiCrudIdentity.Policies.Requirements;
using RoomsApiCrudIdentity.Entities;
using Microsoft.AspNetCore.Authorization;

namespace RoomsApiCrudIdentity.Policies.Handlers;

public class ReservationSameCreatorHandler : AuthorizationHandler<ReservationAccessRequirement, Reservation>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ReservationAccessRequirement requirement, Reservation resource)
    {
        if (context.User.Claims.FirstOrDefault(claim => claim.Type == "UserId")?.Value == resource.UserId)
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}
