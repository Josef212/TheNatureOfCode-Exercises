class IndexEdge {
  int indexA, indexB;
  ArrayList<PVector> pointsList;

  IndexEdge(int a, int b, ArrayList<PVector> vertices) {
    indexA = a;
    indexB = b;
    pointsList = vertices;
  }

  PVector GetA() {
    return pointsList.get(indexA).copy();
  }

  PVector GetB() {
    return pointsList.get(indexB).copy();
  }

  PVector GetCenter() {
    PVector a = GetA();
    PVector b = GetB();

    PVector ab = new PVector(b.x - a.x, b.y - a.y);
    return new PVector(a.x + ab.x * 0.5, a.y + ab.y * 0.5);
  }
};

class Edge {
  PVector a, b;

  Edge(PVector _a, PVector _b) {
    a = _a.copy();
    b = _b.copy();
  }

  PVector GetA() {
    return a.copy();
  }

  PVector GetB() {
    return b.copy();
  }

  PVector GetCenter() {
    PVector ab = new PVector(b.x - a.x, b.y - a.y);
    return new PVector(a.x + ab.x * 0.5, a.y + ab.y * 0.5);
  }
};

class Tri {
  PVector a, b, c;

  Tri(PVector _a, PVector _b, PVector _c) {
    a = _a.copy();
    b = _b.copy();
    c = _c.copy();
  }

  PVector GetAB() {
    return b.sub(a);
  }

  PVector GetABCenter() {
    return GetAB().mult(0.5);
  }

  PVector GetBC() {
    return c.sub(b);
  }

  PVector GetBCCenter() {
    return GetBC().mult(0.5);
  }

  PVector GetCA() {
    return a.sub(c);
  }

  PVector GetCACenter() {
    return GetCA().mult(0.5);
  }

  PVector GetCenter() {
    return new PVector(
      (a.x + b.x + c.x) / 3,
      (a.y + b.y + c.y) / 3
    );
  }

  void Draw() {
    stroke(225, 20, 20, 255);
    noFill();
    line(a.x, a.y, b.x, b.y);
    line(b.x, b.y, c.x, c.y);
    line(c.x, c.y, a.x, a.y);
  }
};

ArrayList<PVector> vertices = new ArrayList<PVector>();
ArrayList<IndexEdge> edges = new ArrayList<IndexEdge>();
ArrayList<PVector> points = new ArrayList<PVector>();
PVector lastVertex = null;

PVector shapeMin = new PVector(Float.MAX_VALUE, Float.MAX_VALUE), shapeMax = new PVector(0, 0);

void CreateSquare() {
  vertices.add(new PVector(10, height - 10));
  vertices.add(new PVector(width - 10, height - 10));
  vertices.add(new PVector(width - 10, 10));
  vertices.add(new PVector(10, 10));

  shapeMin = new PVector(10, 10);
  shapeMax = new PVector(width - 10, height - 10);

  edges.add(new IndexEdge(0, 1, vertices));
  edges.add(new IndexEdge(1, 2, vertices));
  edges.add(new IndexEdge(2, 3, vertices));
  edges.add(new IndexEdge(3, 0, vertices));
}

void CreateShape(int verticesCount) {
  float angleSection = 360.0 / verticesCount;
  float startingAngle = 0.0;

  for(int i = 0; i < verticesCount; ++i) {
    float angle = angleSection * i + startingAngle;

    float x = map(cos(radians(angle)), -1, 1, 0, width);
    float y = map(sin(radians(angle)), -1, 1, 0, height);
    vertices.add(new PVector(x, y));

    if(x < shapeMin.x) {
      shapeMin.set(x, shapeMin.y);
    }
    if(y < shapeMin.y) {
      shapeMin.set(shapeMin.x, y);
    }
    if(x > shapeMax.x) {
      shapeMax.set(x, shapeMax.y);
    }
    if(y > shapeMax.y) {
      shapeMax.set(shapeMax.x, y);
    }
  }

  for(int i = 0; i < vertices.size(); ++i) {
    IndexEdge e = new IndexEdge(i, (i + 1) % vertices.size(), vertices);
    edges.add(e);
  }
  print(edges.size());
}

int pointsWidth = 2, pointsHeight = 2;
void setup() {
  size(1000, 1000);
  frameRate(30);
  background(0);
  
  //CreateSquare();
  CreateShape(6);
  lastVertex = GetRandomPointInShape();
  lastVertex = new PVector(width * 0.5 + random(-width * -0.7, width * -0.7), height * 0.5 + random(-height * -0.7, height * -0.7));

  // --------------------------------------------

  boolean debugSetup = false;

  if(debugSetup) {
    noLoop();

    noStroke();
    fill(255);
  
    for(PVector v : vertices) {
      ellipse(v.x, v.y, pointsWidth, pointsHeight);
    }
  
    fill(255, 255, 0);
    ellipse(lastVertex.x, lastVertex.y, pointsWidth, pointsHeight);

    stroke(255);
    noFill();

    for(IndexEdge ie : edges) {
      PVector a = ie.GetA();
      PVector b = ie.GetB();

      line(a.x, a.y, b.x, b.y);
    }

    for(int i = 0; i < 500; ++i) {
      PVector rnd = GetRandomPointInShape();
      fill(255, 255, 0);
      ellipse(rnd.x, rnd.y, pointsWidth, pointsHeight);
    }
  }
}

void draw() {
  background(0);
  beginShape();
  fill(75);
  noStroke();
  for(PVector p : vertices) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
  
  for(int i = 0; i < points.size() - 1; ++i) {
    PVector p = points.get(i);
  
    noStroke();
    fill(255);
    ellipse(p.x, p.y, pointsWidth, pointsHeight);
  }

  IndexEdge e = GetRandomEdge();
  PVector a = e.GetA();
  PVector b = e.GetB();
  Tri t = new Tri(lastVertex, a, b);
  PVector triCenter = t.GetCenter();

  noStroke();
  fill(255, 0, 0);
  ellipse(lastVertex.x, lastVertex.y, pointsWidth, pointsHeight);
  
  fill(0, 255, 0);
  ellipse(a.x, a.y, pointsWidth, pointsHeight);
  ellipse(b.x, b.y, pointsWidth, pointsHeight);
  
  points.add(triCenter);
  fill(0, 0, 255);
  ellipse(triCenter.x, triCenter.y, pointsWidth, pointsHeight);

  t.Draw();

  lastVertex = triCenter;
}

PVector GetRandomPointInSquare() {
 return new PVector(random(shapeMin.x, shapeMax.x), random(shapeMin.y, shapeMax.y)); 
}

PVector GetRandomPointInShape() {
  float radius = shapeMax.sub(shapeMin).mag() * 0.5;
  float xR = random(-radius, radius);
  float yR = random(-radius, radius);

  return new PVector(width * 0.5 + xR, height * 0.5 + yR);
}

IndexEdge GetRandomEdge() {
  int randomIndex = int(random(0, edges.size()));
  return edges.get(randomIndex);
}
