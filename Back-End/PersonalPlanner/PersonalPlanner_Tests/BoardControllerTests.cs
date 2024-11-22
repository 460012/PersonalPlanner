using InterfaceLayer.DTO;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using System.Net.Http;

namespace PersonalPlanner_Tests
{
    public class BoardControllerTests : IClassFixture<CustomWebApplicationFactory<Program>>
    {
        private readonly HttpClient _client;

        public BoardControllerTests(CustomWebApplicationFactory<Program> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task GetAvailableBoardNumber_ShouldReturnBoardNumber()
        {
            // Arrange
            var response = await _client.GetAsync("/Board/GetAvailableBoardNumber");

            // Act
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            int boardNumber = int.Parse(responseString);

            // Assert
            Assert.False(string.IsNullOrEmpty(responseString));
            Assert.True(boardNumber > 0);
        }

        [Fact]
        public async Task CreateBoard_ShouldCreateBoard()
        {
            // Arrange
            var board = new BoardDTO { id = 1, name = "Test Board", projectID = 1, number = 1 };
            var content = new StringContent(JsonConvert.SerializeObject(board), Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PostAsync("/Board/CreateBoard", content);
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            bool result = bool.Parse(responseString);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public async Task AddTaskToBoard_ShouldAddTaskToBoard()
        {
            // Arrange
            string taskID = "1";
            string boardID = "1";

            // Act
            var response = await _client.GetAsync($"/Board/AddTaskToBoard?taskID={taskID}&boardID={boardID}");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            bool result = bool.Parse(responseString);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public async Task ChangeBoardNumber_ShouldChangeBoardNumber()
        {
            // Arrange
            string boardID = "1";
            string newNumber = "2";

            // Act
            var response = await _client.GetAsync($"/Board/ChangeBoardNumber?boardID={boardID}&newNumber={newNumber}");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            bool result = bool.Parse(responseString);

            // Assert
            Assert.True(result);
        }

        [Fact]
        public async Task ChangeBoardName_ShouldChangeBoardName()
        {
            // Arrange
            string boardID = "1";
            string newName = "New Board Name";

            // Act
            var response = await _client.GetAsync($"/Board/ChangeBoardName?boardID={boardID}&newName={newName}");
            response.EnsureSuccessStatusCode();
            var responseString = await response.Content.ReadAsStringAsync();
            bool result = bool.Parse(responseString);

            // Assert
            Assert.True(result);
        }
    }
}
