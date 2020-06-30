workflow "MYWORK" {
  on = "EVENT"
  resolves = "ACTION3"
}

action "ACTION1" {
  uses = "docker://image1"
}

action "ACTION2" {
  needs = "ACTION1"
  uses = "docker://image2"
}

action "ACTION3" {
  needs = "ACTION2"
  uses = "docker://image3"
}