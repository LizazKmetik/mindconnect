-- ENUM-аналоги €к таблиц≥
CREATE TABLE UserRoles (
    RoleName NVARCHAR(50) PRIMARY KEY
);
INSERT INTO UserRoles VALUES ('Client'), ('Psychologist'), ('Administrator'), ('Moderator');

CREATE TABLE NotificationTypes (
    TypeName NVARCHAR(50) PRIMARY KEY
);
INSERT INTO NotificationTypes VALUES ('SessionReminder'), ('NewMessage'), ('AdminAlert');

CREATE TABLE BookingStatuses (
    StatusName NVARCHAR(50) PRIMARY KEY
);
INSERT INTO BookingStatuses VALUES ('Pending'), ('Confirmed'), ('Completed'), ('Cancelled');

CREATE TABLE PaymentStatuses (
    StatusName NVARCHAR(50) PRIMARY KEY
);
INSERT INTO PaymentStatuses VALUES ('Pending'), ('Completed'), ('Failed');

CREATE TABLE PaymentProviders (
    ProviderName NVARCHAR(50) PRIMARY KEY
);
INSERT INTO PaymentProviders VALUES ('PayPal'), ('Monobank');

-- USERS
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(255),
    Email NVARCHAR(255) UNIQUE NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    Role NVARCHAR(50) NOT NULL FOREIGN KEY REFERENCES UserRoles(RoleName),
    CreatedAt DATETIME DEFAULT GETDATE(),
    LastLogin DATETIME,
    IsActive BIT DEFAULT 1
);

-- PSYCHOLOGIST PROFILE
CREATE TABLE PsychologistProfile (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Bio NVARCHAR(MAX),
	Languages NVARCHAR(255),
	PricePerSession DECIMAL(10,2),
    Specializations NVARCHAR(MAX), -- JSON array as string
    ExperienceYears INT,
    Education NVARCHAR(MAX),
    Certificates NVARCHAR(MAX), -- JSON array as string
    ProfilePhoto NVARCHAR(255)
);

-- PSYCHOLOGIST
CREATE TABLE Psychologist (
    Id UNIQUEIDENTIFIER PRIMARY KEY FOREIGN KEY REFERENCES Users(Id),
    ProfileId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES PsychologistProfile(Id),
    Verified BIT DEFAULT 0
);

-- TIMESLOT
CREATE TABLE TimeSlot (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    PsychologistId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Psychologist(Id),
    StartTime DATETIME,
    EndTime DATETIME,
    IsBooked BIT DEFAULT 0
);

-- CLIENT FAVORITES
CREATE TABLE ClientFavorites (
    ClientId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    PsychologistId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Psychologist(Id),
    PRIMARY KEY (ClientId, PsychologistId)
);

-- BOOKING
CREATE TABLE Booking (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    ClientId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    PsychologistId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Psychologist(Id),
    TimeSlotId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES TimeSlot(Id),
    Status NVARCHAR(50) FOREIGN KEY REFERENCES BookingStatuses(StatusName),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME DEFAULT GETDATE()
);

-- SESSION
CREATE TABLE Session (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    BookingId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Booking(Id),
    PsychologistId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Psychologist(Id),
    ClientId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    Messages NVARCHAR(MAX), -- Represent messages in serialized form
    Timestamp DATETIME DEFAULT GETDATE()
);

-- MESSAGE
CREATE TABLE Message (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    SessionId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Session(Id),
    SenderId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    MessageText NVARCHAR(MAX),
    Timestamp DATETIME DEFAULT GETDATE()
);

-- PAYMENT
CREATE TABLE Payment (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    BookingId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Booking(Id),
    Provider NVARCHAR(50) FOREIGN KEY REFERENCES PaymentProviders(ProviderName),
    Status NVARCHAR(50) FOREIGN KEY REFERENCES PaymentStatuses(StatusName),
    Amount DECIMAL(10, 2),
    Timestamp DATETIME DEFAULT GETDATE()
);

-- NOTIFICATION
CREATE TABLE Notification (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    RecipientId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    NotificationText NVARCHAR(MAX),
    Type NVARCHAR(50) FOREIGN KEY REFERENCES NotificationTypes(TypeName),
    Timestamp DATETIME DEFAULT GETDATE()
);

-- REVIEW
CREATE TABLE Review (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    ClientId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Users(Id),
    PsychologistId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Psychologist(Id),
    BookingId UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Booking(Id),
    Rating INT,
    ReviewText NVARCHAR(MAX),
    CreatedAt DATETIME DEFAULT GETDATE()
);

-- якщо вже ≥снуЇ таблиц€ PsychologistProfile, виконати наступн≥ команди дл€ оновленн€
--ALTER TABLE PsychologistProfile
--ADD Languages NVARCHAR(255);

--ALTER TABLE PsychologistProfile
--ADD PricePerSession DECIMAL(10,2);
