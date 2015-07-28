def mostrarVec(A):
  for elem in A:
    print("{:.6f}".format(elem),end=" ")
  print(end="\n")
  
def esDiagonalDominante(A):
  n=len(A)
  for i in range(n):
    if 2*A[i][i]<sum(A[i]): return False
  return True

def norma(v):
  n=len(v)
  norm=0
  for i in range(n):
    norm+=v[i]**2
  return norm**.5
  
def normaDif(v1,v2):
  n=len(v1)
  norm=0
  for i in range(n):
    norm+=(v1[i]-v2[i])**2
  return norm**.5  
  
def gaussSeidel(A,b,x0,eps,itMax):
  n=len(A)
  nIt=0
  dif=float('inf')
  x=x0[:]
  while nIt<itMax:
    for i in range(n):
      s1=s2=0
      for j in range(i): s1+=A[i][j]*x[j]
      for j in range(i+1,n): s2+=A[i][j]*x0[j] 
      x[i]=1/A[i][i]*(b[i]-s1-s2)
    
    if normaDif(x,x0)/norma(x0)>dif: raise ValueError("El metodo no converge")
    dif=normaDif(x,x0)/norma(x0)  
    if dif<eps: return (x,dif)
    x0=x[:]
    nIt+=1
  raise ValueError("Se alcanzo el numero maximo de iteraciones")
      
    
  
A=[[4,-1,0,-1,0,0],
   [-1,4,-1,0,-1,0],
   [0,-1,4,0,0,-1],
   [-1,0,0,4,-1,0],
   [0,-1,0,-1,4,-1],
   [0,0,-1,0,-1,4]
  ]
b=[0,5,0,6,-2,6]
x0=[0,0,0,0,0,1]  
 
res,error=gaussSeidel(A,b,x0,1e-3,300)
mostrarVec(res)
print("Error relativo={:.7f}".format(error))
