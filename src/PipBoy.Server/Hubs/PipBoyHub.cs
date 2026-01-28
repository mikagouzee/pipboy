using Microsoft.AspNetCore.SignalR;

namespace PipBoy.Server.Hubs;

public class PipBoyHub : Hub
{
    // High-level navigation event
    public async Task SendNavigation(string direction)
    {
        // "direction" will be "NEXT" or "PREV"
        // We will use a rotary encoder for navigation, so this abstracts away button presses
        await Clients.All.SendAsync("OnNavigate", direction);
    }
}