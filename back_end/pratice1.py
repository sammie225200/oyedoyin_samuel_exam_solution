class Pet :
    def __init__(self, name, species, age):
        self.name = name
        self.species = species
        self.age = age
    
    def displayinfo(self):
        print(f"Here is here details about your pet\n {self}")
    def celebrate(self):
        print(f"{self.name} Birthday Today")
        print(f"Congrats {self.name} of {self.species} species you are {self.age} years old today")

Dog = Pet("Dog", "German sheperd", "5")
Dog.displayinfo()
Dog.celebrate()