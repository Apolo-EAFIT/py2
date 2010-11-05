#include<iostream>
#include<algorithm>
#include<vector>
using namespace std;

struct node{
  int pos;
  int val;
  node(int i, int j){
    val = i;
    pos = j;
  }
  node(){}
  bool operator < (const node &t) const{
    return val < t.val;
  }
};
vector<node> order;
vector<int> a;
bool can_solve(int d)
{
  for(int i = 1; i < order.size() ; ++i)
    if( abs(order[i].pos - order[i-1].pos) > d ) 
      return false;
  return true;
}
int solve(int d)
{
  
  int minix =  order[0].pos;
  vector<node> p;
  for(int i = 0 ; i <= minix ; ++i)
    p.push_back(node(a[i],i));
  
}
int main(){
  int n, d;
  while( cin >> n >> d )
    {
      order.clear();
      if(n == 0 and d == 0) break;
      for(int i = 0,t ; i < n and cin >> t; ++i)
        order.push_back(node( t, n)), a.push_back(t);
      sort(order.begin(), order.end());
      if(can_solve(d))
        {
          if(order[0].pos > order.back().pos)
            {
              for(int i = 0; i < order.size(); ++i)
                order[i].pos = order.size() - 1 - order[i].pos;
            }
          printf("%d\n", solve(d));
        }
      else
        puts("-1");
    }
  return 0;
}
