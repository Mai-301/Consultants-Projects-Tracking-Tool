var Project = function (name, desc, startDate, endDate, status, budget, estimate, assigneeTeamLeader) {
    this.name = name;
    this.desc = desc;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.budget = budget;
    this.estimate = estimate;
    this.assigneeTeamLeader = assigneeTeamLeader;
}
Project.prototype.track = function () {

}
Project.prototype.done = function () {

}
