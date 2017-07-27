#include <stdio.h>
#include <math.h>
#define max(a, b) (a) > (b) ? a:b
#define PI M_PI
#define EPS 10e-6
// Sb (боковая) = pi * ( a + b ) * sqrt((a-b)^2 + h^2)
// h = 3 * V / (pi * (a^2 + a*b + b^2))
// V = 1/3 * pi * h * (a^2 + a*b + b^2)

// Стоимость: 150 * Sb + 100 * pi * (a^2 + b^2)

static double V = -1;
static double FI = (1 + sqrt(5))/2;

double Sb(double a, double b);
double Sd(double a); // Площадь основания

double f1(double);
double f2(double);
double find_min(double (*fun)(double), double a, double b);

int main() {

  // Ввод V
  V = 10;

  double a, b, h, a1, b1;
  a = a1 = b = b1 = h = 1;
  do {
    u = 0, v = V; // Границы

    double x1, x2;
    x1 = v - (v-u)/fi;
    x2 = u + (v-u)/fi;

    while ((v - u) / 2 > EPS) {
      if (fun(x1) > fun(x2)) {
        u = x1; x1 = x2; x2 = v - (x1-u);
      } else if (fun(x1) < fun(x2)) {
        v = x2; x2 = x1; x1 = u + (v - x2);
      } else break;
    }
    b1 =  (u+v) / 2;

    u = 0, v = V; // Границы
    x1 = v - (v-u)/fi;
    x2 = u + (v-u)/fi;

    double a1 = find_min(f2, 0, V);
  } while(max(abs(b-b1), abs(a-a1)) > EPS);


  h = 3 * V / (PI * (a^2 + a*b + b^2));
  printf('A: %.10f, B: %.10f, H: %.10f', a, b, h);
}

double Sb(double a, double b) {
  if (V == -1)  {
    printf('V was not set!');
    return -1;
  }
  return PI * (a + b) * sqrt( pow((a - b), 2)
         + (3 * V / (PI * (pow(a, 2) + a*b + pow(b, 2)) ) ) );
}

double Sd(double a) {
  return PI * pow(a, 2);
}

double find_min(double (*fun)(double), u, v) {
  // Золотое сечение
  double fi = (1 + sqrt(5))/2;
  double x1, x2;
  x1 = v - (v-u)/fi;
  x2 = u + (v-u)/fi;

  while ((v - u) / 2 > EPS) {
    if (fun(x1) > fun(x2)) {
      u = x1; x1 = x2; x2 = v - (x1-u);
    } else if (fun(x1) < fun(x2)) {
      v = x2; x2 = x1; x1 = u + (v - x2);
    } else break;
  }
  return (u+v) / 2;
}
