using FluentAssertions;
using InterfaceLayer.DTO;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonalPlanner.Tests
{
    public class ProjectControllerTests : IClassFixture<CustomWebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public ProjectControllerTests(CustomWebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetAvailableProjectID_ReturnsSuccessStatusCode()
        {
            // Act
            var response = await _client.GetAsync("/Project/GetAvailableProjectID");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            var responseString = await response.Content.ReadAsStringAsync();
            responseString.Should().NotBeNullOrEmpty();
        }

        [Fact]
        public async Task CreateProject_ReturnsSuccessStatusCode()
        {
            // Arrange
            var newProject = new ProjectDTO
            {
                id = 1,
                teamID = 1,
                ownerID = 1,
                name = "Test Project",
                description = "Test Project Description"
            };

            var content = new StringContent(JsonConvert.SerializeObject(newProject), Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PostAsync("/Project/CreateProject", content);

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            var responseString = await response.Content.ReadAsStringAsync();
            responseString.Should().Contain("true");
        }

        [Fact]
        public async Task GetAllYourRelatedProjects_ReturnsSuccessStatusCode()
        {
            // Act
            var response = await _client.GetAsync("/Project/GetAllYourRelatedProjects?UserID=1");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            var responseString = await response.Content.ReadAsStringAsync();
            responseString.Should().NotBeNullOrEmpty();
        }

        [Fact]
        public async Task GetAllProjectSprints_ReturnsSuccessStatusCode()
        {
            // Act
            var response = await _client.GetAsync("/Project/GetAllProjectSprints?ProjectID=1");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            var responseString = await response.Content.ReadAsStringAsync();
            responseString.Should().NotBeNullOrEmpty();
        }

        [Fact]
        public async Task GetAllProjectTasks_ReturnsSuccessStatusCode()
        {
            // Act
            var response = await _client.GetAsync("/Project/GetAllProjectTasks?ProjectID=1");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            var responseString = await response.Content.ReadAsStringAsync();
            responseString.Should().NotBeNullOrEmpty();
        }

        [Fact]
        public async Task GetAllProjectBoards_ReturnsSuccessStatusCode()
        {
            // Act
            var response = await _client.GetAsync("/Project/GetAllProjectBoards?ProjectID=1");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            var responseString = await response.Content.ReadAsStringAsync();
            responseString.Should().NotBeNullOrEmpty();
        }

        [Fact]
        public async Task getBoardTasks_ReturnsSuccessStatusCode()
        {
            // Act
            var response = await _client.GetAsync("/Project/getBoardTasks?ProjectID=1");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
            var responseString = await response.Content.ReadAsStringAsync();
            responseString.Should().NotBeNullOrEmpty();
        }
    }
}
