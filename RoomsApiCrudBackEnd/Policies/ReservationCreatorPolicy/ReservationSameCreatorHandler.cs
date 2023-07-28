using System.Security.Claims;
using RoomsApiCrudIdentity.Policies.Requirements;
using RoomsApiCrudIdentity.Entities;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;

namespace RoomsApiCrudIdentity.Policies.Handlers;

public class ReservationSameCreatorHandler : AuthorizationHandler<ReservationAccessRequirement, Reservation>
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public ReservationSameCreatorHandler(IHttpContextAccessor httpContextAccessor)
    {
       _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
    }
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, ReservationAccessRequirement requirement, Reservation resource)
    {
        // string jwt = _httpContextAccessor.HttpContext.Request.Headers
        //     .Any(x => x.Key == "Authorization") ? 
        //         _httpContextAccessor.HttpContext.Request.Headers
        //             .Where(x => x.Key == "Authorization")
        //             .FirstOrDefault()
        //             .Value
        //             .SingleOrDefault()
        //             .Replace("Bearer ", "") : "";
        // JwtSecurityTokenHandler handler = new();
        // JwtSecurityToken token = handler.ReadJwtToken(jwt);
        if (_httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(claim => claim.Type.Equals("UserId"))?.Value.Equals(resource.UserId) ?? false)
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}
