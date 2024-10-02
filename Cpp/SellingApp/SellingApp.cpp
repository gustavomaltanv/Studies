#include <iostream>
#include <string>
#include <vector>

using namespace std;

class Item {
    private:
        int id;
        string name;
        float price;
    public:
        Item() : id(0), name("Indefinido"), price(0.0f) { }

        Item(int i, string n, float p) : id(i), name(n), price(p) { }

        void listar() {
            cout << name << " - $" << price << endl;
        }

        float getPrice() { return price; }
};

vector<Item> CreateCatalog() {
    return {
        Item(1, "Vinho Nacional", 45.00f),
        Item(2, "Vinho Importado - Chile", 85.00f),
        Item(3, "Vinho Importado - Argentina", 45.50f),
        Item(4, "Vinho Importado - Uruguai", 55.50f),
        Item(5, "Vinho Importado - Portugal", 119.99f)
    };
}

void GetList(vector<Item> L) {
    for (size_t i = 0; i < L.size(); i++)
    {
        cout << i + 1 << ": ";
        L[i].listar();
    }
}

bool KeepBuying() {
    int keep;
    
    while (true)
    {
        cout << "Deseja continuar comprando?" << endl;
        cout << "1: Sim" << endl << "0: Nao" << endl;
        cin >> keep;
        system("cls");
        if (keep == 1) return true;
        if (keep == 0) return false;
        cout << "Opcao invalida, tente novamente..." << endl;
    }
}

vector<int> ProductChoosen(vector<Item> C) {
    vector<int> list;
    int option;

    while (true)
    {
        cout << "Compre seu vinho..." << endl;
        cout << "0: Cancelar compra" << endl;
        GetList(C);
        cout << "Escolha o item: ";
        cin >> option;
        system("cls");
        
        if (option == 0) 
        {
            break;
        }
        else if (option > C.size() || option < 0) 
        {
            cout << "Opcao invalida, escolha novamente..." << endl;
        }
        else 
        {
            list.push_back(option-1);
            if (!KeepBuying()) {
                break;
            }
        }

    } 
    return list;
}

void GetPaymentList(vector<Item> L, vector<int> B) {
    cout << "Seu carrinho:" << endl;
    float sum = 0.00f;
    for (size_t i = 0; i < B.size(); i++)
    {
        cout << i + 1 << " - ";
        L[B[i]].listar();
        sum += L[B[i]].getPrice();
    }
    cout << endl << "Total: $" << sum << endl << endl;
}

void CreditMethod() {
    int parcelas;
    while (true)
    {
        cout << "Em quantas vezes deseja parcelar? (min 1x, max 12x)" << endl;
        cin >> parcelas;
        system("cls");
        if (parcelas >= 1 && parcelas <= 12) {
            cout << "Compra paga pelo credito (" << parcelas << " parcelas).";
            break;
        }
        cout << "Opcao invalida, tente novamente....";
    }
}

void GetPaymentMethod() {
    int opt;
    while (true) 
    {
        cout << endl << "Como deseja pagar?" << endl;
        cout << "1: Dinheiro" << endl;
        cout << "2: Cartao Credito" << endl;
        cout << "3: Cartao Debito" << endl;
        cout << "0: Cancelar compra" << endl;

        cout << "Selecione a opcao: ";
        cin >> opt;
        system("cls");
        
        switch (opt) 
        {
        case 0: 
            cout << "Compra cancelada.";
            return;
            break;

        case 1:
            cout << "Compra paga pelo dinheiro.";
            return;
            break;

        case 2:
            CreditMethod();
            return;
            break;

        case 3:
            cout << "Compra paga pelo debito.";
            return;
            break;

        default:
            cout << "Opcao invalida, tente novamente..." << endl;
            break;
        }
        
        
    }
}

void Payment(vector<Item> C, vector<int> B) {
    GetPaymentList(C, B);
    GetPaymentMethod();

}

int main()
{
    int option = -1;

    vector<Item> Catalog = CreateCatalog();
    vector<int> Basket;

    Basket = ProductChoosen(Catalog);

    Payment(Catalog, Basket);
    return 0;
}