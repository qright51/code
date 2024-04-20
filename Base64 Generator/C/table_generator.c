#include <stdio.h>
#include <stdlib.h>

int main() {
	char symbol[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	
	int counter[4] = {-1,0,0,0};
	
	char buff[16777216][5];

    FILE *fptr;
    fptr = fopen("table.txt", "w");
    if (fptr == NULL) {
        printf("[x] Error!");
        exit(1);
    }
    
    for(int i=0; i<16777216; i++){
    	counter[0]++;
    	if(counter[0]>=64) {counter[0]=0; counter[1]++;}
    	if(counter[1]>=64) {counter[1]=0; counter[2]++;}
    	if(counter[2]>=64) {counter[2]=0; counter[3]++;}
    	
    	/*buff[i][0] = symbol[counter[3]];
    	buff[i][1] = symbol[counter[2]];
    	buff[i][2] = symbol[counter[1]];
    	buff[i][3] = symbol[counter[0]];
    	buff[i][4] = '\n';*/
	}
	
	fprintf(fptr, "%s", buff);
	
	fclose(fptr);
    
    printf("[x] Success!");
        
    return 0;
}

