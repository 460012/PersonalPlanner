using InterfaceLayer.Logic;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Register your services
builder.Services.AddScoped<IProject>(provider =>
    new LogicFactory.LogicFactory().getProject(new DalFactory.DalFactory().getMysqlProjectDal()));
builder.Services.AddScoped<IBoard>(provider =>
    new LogicFactory.LogicFactory().getBoard(new DalFactory.DalFactory().getMysqlBoardDal()));
builder.Services.AddScoped<ITask>(provider =>
    new LogicFactory.LogicFactory().getTask(new DalFactory.DalFactory().getMysqlTaskDal()));
builder.Services.AddScoped<ISprint>(proviuder =>
    new LogicFactory.LogicFactory().getSprint(new DalFactory.DalFactory().getMysqlSprintDal()));
builder.Services.AddScoped<IUser>(provider =>
    new LogicFactory.LogicFactory().getUser(new DalFactory.DalFactory().getMysqlUserDal()));


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            //policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
            policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
