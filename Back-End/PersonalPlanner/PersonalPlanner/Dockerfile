# Use the latest version of the .NET SDK as the build environment
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy the solution file and restore as distinct layers
COPY PersonalPlanner/PersonalPlanner.sln .
COPY PersonalPlanner/PersonalPlanner/PersonalPlanner.csproj ./PersonalPlanner/
COPY PersonalPlanner/MySqlLibrary/MySqlLibrary.csproj ./MySqlLibrary/
COPY PersonalPlanner/Test_Data_Layer/Test_Data_Layer.csproj ./Test_Data_Layer/
COPY PersonalPlanner/DalFactory/DalFactory.csproj ./DalFactory/
COPY PersonalPlanner/LogicFactory/LogicFactory.csproj ./LogicFactory/
COPY PersonalPlanner/Logic_Layer/Logic_Layer.csproj ./Logic_Layer/
COPY PersonalPlanner/InterfaceLayer/InterfaceLayer.csproj ./InterfaceLayer/
COPY PersonalPlanner/LogicLayer_Tests/LogicLayer_Tests.csproj ./LogicLayer_Tests/
RUN dotnet restore

# Copy the remaining source code and build the application
COPY . .
RUN dotnet publish PersonalPlanner/PersonalPlanner -c Release -o /app/out

# Use the ASP.NET Core runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:latest AS runtime
WORKDIR /app
COPY --from=build /app/out ./
ENTRYPOINT ["dotnet", "PersonalPlanner.dll"]
