
import { MessageSquare, Search, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Matching = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">¡Bienvenido a ScholarConnect!</h1>
        <p className="text-lg text-muted-foreground">
          Encuentra colaboradores académicos que compartan tus intereses y objetivos de investigación
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">150+</h3>
              <p className="text-sm text-muted-foreground">Investigadores Online</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-green-100 rounded-full">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">45</h3>
              <p className="text-sm text-muted-foreground">Matches Exitosos</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-purple-100 rounded-full">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">280</h3>
              <p className="text-sm text-muted-foreground">Mensajes Enviados</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Section */}
      <div className="text-center">
        <Button size="lg" className="bg-scholar-blue hover:bg-scholar-blue/90">
          <Search className="mr-2 h-5 w-5" />
          Comenzar a Buscar Colaboradores
        </Button>
      </div>
    </div>
  );
};

export default Matching;
