-- ENUM-аналоги як таблиці
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

-- Якщо вже існує таблиця PsychologistProfile, виконати наступні команди для оновлення
--ALTER TABLE PsychologistProfile
--ADD Languages NVARCHAR(255);

--ALTER TABLE PsychologistProfile
--ADD PricePerSession DECIMAL(10,2);

-- 1. Створимо користувача (User)
DECLARE @UserId UNIQUEIDENTIFIER = NEWID();
INSERT INTO Users (Id, Name, Email, Password, Role, CreatedAt, IsActive)
VALUES (@UserId, 'Ірина Психолог', 'iryna@example.com', 'hashed_password_123', 'Psychologist', GETDATE(), 1);

-- 2. Створимо профіль (PsychologistProfile)
DECLARE @ProfileId UNIQUEIDENTIFIER = NEWID();
INSERT INTO PsychologistProfile (Id, Bio, Languages, PricePerSession, Specializations, ExperienceYears, Education, Certificates, ProfilePhoto)
VALUES (
    @ProfileId,
    N'Досвідчений психолог із практикою понад 5 років у сфері когнітивно-поведінкової терапії.',
    N'Українська, Англійська',
    600.00,
    N'["Тривожність", "Депресія", "Самооцінка"]',
    6,
    N'Київський національний університет, факультет психології',
    N'["cert1.jpg", "cert2.jpg"]',
    N'/images/profiles/iryna.jpg'
);

-- 3. Створимо запис у таблиці Psychologist
INSERT INTO Psychologist (Id, ProfileId, Verified)
VALUES (@UserId, @ProfileId, 1);

UPDATE PsychologistProfile
SET ProfilePhoto = '/img/profiles/iryna.jpg'
WHERE ProfilePhoto = '/images/profiles/iryna.jpg';
