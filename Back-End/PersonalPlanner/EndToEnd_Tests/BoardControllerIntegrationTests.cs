using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EndToEnd_Tests
{
    public class BoardControllerIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public BoardControllerIntegrationTests(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetAvailableBoardNumber_Returns_Ok()
        {
            // Arrange
            var client = _factory.CreateClient();

            // Act
            var response = await client.GetAsync("/Board/GetAvailableBoardNumber");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }

        [Fact]
        public async Task CreateBoard_Returns_Ok()
        {
            // Arrange
            var client = _factory.CreateClient();
            var requestContent = new StringContent("{\"id\":1, \"name\":\"Board1\", \"projectID\":1, \"number\":1 }", System.Text.Encoding.UTF8, "application/json");

            // Act
            var response = await client.PostAsync("/Board/CreateBoard", requestContent);

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }

        // Add more test methods for other endpoints
    }
}
