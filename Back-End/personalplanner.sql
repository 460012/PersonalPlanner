-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 30 mei 2024 om 23:23
-- Serverversie: 10.4.6-MariaDB
-- PHP-versie: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `personalplanner`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `agenda`
--

CREATE TABLE `agenda` (
  `ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Task_ID` int(11) DEFAULT NULL,
  `StartDateTime` datetime NOT NULL,
  `EndDateTime` datetime NOT NULL,
  `Name` varchar(150) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `board`
--

CREATE TABLE `board` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `ProjectID` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `Standard` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `board`
--

INSERT INTO `board` (`ID`, `Name`, `ProjectID`, `number`, `Standard`) VALUES
(1, 'To Do', 1, 0, 1),
(2, 'Board 2', 1, 1, 0),
(3, 'Board 3', 1, 2, 0);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `board_task`
--

CREATE TABLE `board_task` (
  `ID` int(11) NOT NULL,
  `Board_ID` int(11) NOT NULL,
  `Task_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `board_task`
--

INSERT INTO `board_task` (`ID`, `Board_ID`, `Task_ID`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4),
(5, 1, 5),
(6, 1, 6);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `label`
--

CREATE TABLE `label` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Color` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `label_task`
--

CREATE TABLE `label_task` (
  `ID` int(11) NOT NULL,
  `Task_ID` int(11) NOT NULL,
  `Label_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `link`
--

CREATE TABLE `link` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `link_task`
--

CREATE TABLE `link_task` (
  `ID` int(11) NOT NULL,
  `Task_ID` int(11) NOT NULL,
  `Link_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `project`
--

CREATE TABLE `project` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `TeamID` int(11) DEFAULT -1,
  `Description` text NOT NULL,
  `OwnerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `project`
--

INSERT INTO `project` (`ID`, `Name`, `TeamID`, `Description`, `OwnerID`) VALUES
(-1, 'No Project', -1, '', -1),
(1, 'TestProject', -1, 'Testing auto creation standard board', 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `sprint`
--

CREATE TABLE `sprint` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `ProjectID` int(11) NOT NULL,
  `Startdate` datetime NOT NULL,
  `Enddate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `sprint`
--

INSERT INTO `sprint` (`ID`, `Name`, `ProjectID`, `Startdate`, `Enddate`) VALUES
(1, 'Sprint 1', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Sprint 2', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `sprint_task`
--

CREATE TABLE `sprint_task` (
  `ID` int(11) NOT NULL,
  `Sprint_ID` int(11) NOT NULL,
  `Task_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `sprint_task`
--

INSERT INTO `sprint_task` (`ID`, `Sprint_ID`, `Task_ID`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `task`
--

CREATE TABLE `task` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Code` varchar(10) DEFAULT 'Null',
  `ProjectID` int(11) NOT NULL,
  `MainTask` int(11) DEFAULT -1,
  `Description` text,
  `WorkerID` int(11) DEFAULT -1,
  `ReporterID` int(11) NOT NULL DEFAULT -1,
  `StoryPointEstimate` int(11) DEFAULT -1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `task`
--

INSERT INTO `task` (`ID`, `Name`, `Code`, `ProjectID`, `MainTask`, `Description`, `WorkerID`, `ReporterID`, `StoryPointEstimate`) VALUES
(-1, 'No main task', 'Null', -1, -1, 'Null', -1, -1, -1),
(1, 'Task1', 'Null', 1, -1, 'Null', -1, 1, -1),
(2, 'Task2', 'Null', 1, -1, 'Null', -1, 1, -1),
(3, 'Task3', 'Null', 1, -1, 'Changing desc test', -1, 1, -1),
(4, 'Task4', 'Null', 1, -1, 'Null', -1, 1, -1),
(5, 'Task5', 'Null', 1, -1, 'Null', -1, 1, -1),
(6, 'Task6', 'Null', 1, -1, 'Null', -1, 1, -1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `team`
--

CREATE TABLE `team` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `OwnerID` int(11) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `team`
--

INSERT INTO `team` (`ID`, `Name`, `OwnerID`, `Description`) VALUES
(-1, 'No Team', -1, 'No Team Selected');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `team_user`
--

CREATE TABLE `team_user` (
  `ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Team_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `Email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `user`
--

INSERT INTO `user` (`ID`, `Email`) VALUES
(1, '460012@student.fontys.nl'),
(-1, 'NoUser'),
(2, 'siem125125@gmail.com');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `agenda`
--
ALTER TABLE `agenda`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Task_ID` (`Task_ID`);

--
-- Indexen voor tabel `board`
--
ALTER TABLE `board`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ProjectID` (`ProjectID`);

--
-- Indexen voor tabel `board_task`
--
ALTER TABLE `board_task`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Task_ID` (`Task_ID`),
  ADD KEY `Board_ID` (`Board_ID`);

--
-- Indexen voor tabel `label`
--
ALTER TABLE `label`
  ADD PRIMARY KEY (`ID`);

--
-- Indexen voor tabel `label_task`
--
ALTER TABLE `label_task`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Task_ID` (`Task_ID`),
  ADD KEY `Label_ID` (`Label_ID`);

--
-- Indexen voor tabel `link`
--
ALTER TABLE `link`
  ADD PRIMARY KEY (`ID`);

--
-- Indexen voor tabel `link_task`
--
ALTER TABLE `link_task`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Task_ID` (`Task_ID`),
  ADD KEY `Link_ID` (`Link_ID`);

--
-- Indexen voor tabel `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `TeamID` (`TeamID`),
  ADD KEY `OwnerID` (`OwnerID`);

--
-- Indexen voor tabel `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ProjectID` (`ProjectID`);

--
-- Indexen voor tabel `sprint_task`
--
ALTER TABLE `sprint_task`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Sprint_ID` (`Sprint_ID`),
  ADD KEY `Task_ID` (`Task_ID`);

--
-- Indexen voor tabel `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ProjectID` (`ProjectID`),
  ADD KEY `MainTask` (`MainTask`),
  ADD KEY `WorkerID` (`WorkerID`),
  ADD KEY `ReporterID` (`ReporterID`);

--
-- Indexen voor tabel `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `OwnerID` (`OwnerID`);

--
-- Indexen voor tabel `team_user`
--
ALTER TABLE `team_user`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Team_ID` (`Team_ID`);

--
-- Indexen voor tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `agenda`
--
ALTER TABLE `agenda`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `board`
--
ALTER TABLE `board`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT voor een tabel `board_task`
--
ALTER TABLE `board_task`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT voor een tabel `label`
--
ALTER TABLE `label`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `label_task`
--
ALTER TABLE `label_task`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `link`
--
ALTER TABLE `link`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `link_task`
--
ALTER TABLE `link_task`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `project`
--
ALTER TABLE `project`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT voor een tabel `sprint`
--
ALTER TABLE `sprint`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT voor een tabel `sprint_task`
--
ALTER TABLE `sprint_task`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT voor een tabel `task`
--
ALTER TABLE `task`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT voor een tabel `team`
--
ALTER TABLE `team`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `team_user`
--
ALTER TABLE `team_user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT voor een tabel `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `agenda`
--
ALTER TABLE `agenda`
  ADD CONSTRAINT `agenda_ibfk_2` FOREIGN KEY (`Task_ID`) REFERENCES `task` (`ID`),
  ADD CONSTRAINT `agenda_ibfk_3` FOREIGN KEY (`User_ID`) REFERENCES `user` (`ID`);

--
-- Beperkingen voor tabel `board`
--
ALTER TABLE `board`
  ADD CONSTRAINT `board_ibfk_1` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ID`);

--
-- Beperkingen voor tabel `board_task`
--
ALTER TABLE `board_task`
  ADD CONSTRAINT `board_task_ibfk_1` FOREIGN KEY (`Board_ID`) REFERENCES `board` (`ID`),
  ADD CONSTRAINT `board_task_ibfk_2` FOREIGN KEY (`Task_ID`) REFERENCES `task` (`ID`);

--
-- Beperkingen voor tabel `label_task`
--
ALTER TABLE `label_task`
  ADD CONSTRAINT `label_task_ibfk_1` FOREIGN KEY (`Label_ID`) REFERENCES `label` (`ID`),
  ADD CONSTRAINT `label_task_ibfk_2` FOREIGN KEY (`Task_ID`) REFERENCES `task` (`ID`);

--
-- Beperkingen voor tabel `link_task`
--
ALTER TABLE `link_task`
  ADD CONSTRAINT `link_task_ibfk_1` FOREIGN KEY (`Link_ID`) REFERENCES `link` (`ID`),
  ADD CONSTRAINT `link_task_ibfk_2` FOREIGN KEY (`Task_ID`) REFERENCES `task` (`ID`);

--
-- Beperkingen voor tabel `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`TeamID`) REFERENCES `team` (`ID`),
  ADD CONSTRAINT `project_ibfk_2` FOREIGN KEY (`OwnerID`) REFERENCES `user` (`ID`);

--
-- Beperkingen voor tabel `sprint`
--
ALTER TABLE `sprint`
  ADD CONSTRAINT `sprint_ibfk_1` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ID`);

--
-- Beperkingen voor tabel `sprint_task`
--
ALTER TABLE `sprint_task`
  ADD CONSTRAINT `sprint_task_ibfk_1` FOREIGN KEY (`Sprint_ID`) REFERENCES `sprint` (`ID`),
  ADD CONSTRAINT `sprint_task_ibfk_2` FOREIGN KEY (`Task_ID`) REFERENCES `task` (`ID`);

--
-- Beperkingen voor tabel `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ID`),
  ADD CONSTRAINT `task_ibfk_4` FOREIGN KEY (`MainTask`) REFERENCES `task` (`ID`),
  ADD CONSTRAINT `task_ibfk_5` FOREIGN KEY (`ReporterID`) REFERENCES `user` (`ID`),
  ADD CONSTRAINT `task_ibfk_6` FOREIGN KEY (`WorkerID`) REFERENCES `user` (`ID`);

--
-- Beperkingen voor tabel `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`OwnerID`) REFERENCES `user` (`ID`);

--
-- Beperkingen voor tabel `team_user`
--
ALTER TABLE `team_user`
  ADD CONSTRAINT `team_user_ibfk_1` FOREIGN KEY (`Team_ID`) REFERENCES `team` (`ID`),
  ADD CONSTRAINT `team_user_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `user` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
